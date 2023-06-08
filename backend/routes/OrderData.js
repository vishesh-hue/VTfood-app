const express = require('express')
const router = express.Router()

const Order = require('../models/Orders')

router.post('/orderData' , async(req , res)=>{
    let data = req.body.order_data

    await data.splice(0,0, {Order_date: req.body.order_date})
    
    let eId = await Order.findOne({'email' : req.body.email})
    //first order
    console.log(eId)
    if(eId === null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success:true})
            })
        }
        catch(err){
            console.log(err.message)
            res.send("server error" , err.message)
        }

    }
    // if not the first order
    else{
        try{
            await Order.findOneAndUpdate( {email:req.body.email},
                {$push: { order_data : data }}).then(()=>{
                    res.json({ success: true})
                })
            }
            catch(err){
                console.log(err.message)
            }

        }
    }
)

router.post('/myorderData' , async(req , res)=>{
    try{
        let myData = await Order.findOne({'email' : req.body.email})
        res.json({orderData: myData})

    }
    catch(err){
        console.log(err.message)

    }

})
module.exports = router;
