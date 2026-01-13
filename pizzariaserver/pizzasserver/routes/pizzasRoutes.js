const express = require("express")
const router = express.Router()

const Pizza = require("../model/pizzas")

router.get("/", async(req,res)=>{
    try{
        const pizzas = await Pizza.find()
        res.status(200).json(pizzas)
    }catch(e){
        res.status(500).json({message:"failed to fetch pizzas"})
    }
})

module.exports = router