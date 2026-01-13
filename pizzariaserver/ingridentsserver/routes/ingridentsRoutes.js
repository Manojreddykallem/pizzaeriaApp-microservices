const express = require("express")
const router = express.Router()

const Ingrident = require("../model/ingridents")

router.get("/", async(req,res)=>{
    try{
        const ingridents = await Ingrident.find()
        res.status(200).json(ingridents)
    }catch(e){
        res.status(500).json({message:"failed to fetch ingridents"})
    }
})

module.exports = router