import express from 'express'
import { Prisma } from '@prisma/client'
import { loginDetailSchema, registerSchema } from './utils/typechecker'
import { prisma } from './prisma'
import * as bcrypt from "bcryptjs"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import jwt, { JsonWebTokenError } from "jsonwebtoken";
const router = express.Router()
router.use(express.json())
const JWT_secret = process.env.JWT_secret || "123456789";


router.post('/register',async(req,res)=>{
    const result = registerSchema.safeParse(req.body as Prisma.UserCreateInput)
    if(!result.success){
        return res.status(400).json({errorMessage:"Invalid Inputs"})
    }
    const { firstName, lastName, password, email } = result.data
    const hashedPassword  =await bcrypt.hash(password,10)
    try{
        const user =await prisma.user.create({
            data :{
                firstName ,
                lastName ,
                email,
                password:hashedPassword
            }

        })

        if(!user){
            res.status(405).json({errorMessage:'Request connt be processed currently'})
        }

        return res.status(201).json({message:'User was successfullly created.'})
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                console.log('There is a unique constraint violation, a new user cannot be created with this ID')
                return res.status(409).json({ errorMessage: "A record with this email already exists." })
            }
        }else{
            return res.status(500).json({message:'Unexpected Error occured'})
        }
    }
    
})

router.get('/login',async(req,res)=>{
    const creds = req.body
    const results = loginDetailSchema.safeParse(req.body)

    if(!results.success){
        return res.status(400).json({errorMessage:results.error.issues[0].message})
    }
    const {email,password} = results.data

    try{
        const user = await prisma.user.findUnique({
            where:{
                email:email
            },
            select:{
                id:true,
                email:true,
                password:true,
                firstName:true,
                lastName:true,
                imagePath:true,
                isVerified:true,
            }
        })

        if(!user){
            return res.status(401).json({errorMessage:'Invalid credentials'})
        }
        if(!user.isVerified){
            return res.status(405).json({ 
                errorMessage: "Not Verified. Please verify and try again!" 
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            return res.status(401).json({errorMessage:'Invalid credentials'})
        }

        const tokenPayload = {
            email:user.email,
            userIdl: user.id
        }

        const token = jwt.sign(tokenPayload, JWT_secret,  { expiresIn: "1hr" })

        return res.status(200).json({
            message:'Login Successful',
            sessionToken:token,
            payload:{...user}
        })
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === '2025'){
                return res.status(401).json({errorMessage:'User not found'})
            }
        }

        if(error instanceof JsonWebTokenError){
            if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(403).json({
                errorMessage: "User token has expired or is not valid",
                });
            }
        }

        console.error("Unexpected Error:", error);
        return res.status(500).json({ errorMessage: "Internal server error" });
    }
})

export default router