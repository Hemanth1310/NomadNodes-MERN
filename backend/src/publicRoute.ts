import express from 'express'
import { prisma } from './prisma'

const router = express.Router()

router.get('/allNodes',async(req,res)=>{
    try{
        const nodes = await prisma.node.findMany()
        if(!nodes || nodes.length===0){
            res.status(404).json({errorMessage:'Nothing to display'})
        }
        res.json({
            message:"Nodes Fetched",
            payload:nodes
        })
    }catch(error){
        res.status(500).json({errorMessage:"Internal Server Error"})
    }
})


export default router