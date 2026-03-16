import express from 'express'
import { prisma } from './prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const router  = express.Router()
router.use(express.json())

router.get('/userDetails',async(req,res)=>{
    const userId = req.user?.userId

    try{
        const user = await prisma.user.findFirst({
            where:{
                id:userId
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
            return res.status(404).json({errorMessage:"User not found"})
        }
        return res.status(200).json({
            message:'Login Successful',
            payload:{...user}
        })
    }catch(error){
          if(error instanceof PrismaClientKnownRequestError){
                    if(error.code === '2025'){
                        return res.status(401).json({errorMessage:'User not found'})
                    }
                }
            console.error("Unexpected Error:", error);
            return res.status(500).json({ errorMessage: "Internal server error" });
        
    }
})

export default router