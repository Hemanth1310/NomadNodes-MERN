import express from 'express'
import { Prisma } from '@prisma/client'
import { registerSchema } from './utils/typechecker'
import { prisma } from './prisma'
import * as bcrypt from "bcryptjs"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
const router = express.Router()

router.post('/register',async(req,res)=>{
    const result = registerSchema.safeParse(req.body as Prisma.UserCreateInput)
    if(!result.success){
        return res.status(400).json({errorMessage:"Invalid Inputs"})
    }
    const { firstName, lastName, password, email } = result.data
    const hashedPassword  =await bcrypt.hash(password,10)
    try{
        const user = prisma.user.create({
            data :{
                firstName ,
                lastName ,
                email,
                password:hashedPassword
            }

        })

        if(!user){
            res.status(405).json({errorMessage:'REquest connt be processed currently'})
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

export default router