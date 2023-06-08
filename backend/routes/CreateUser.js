const express = require('express')
const user = require('../models/user')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = express.Router()

const jwtSecret = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

router.post('/createuser',

    [
        body('name').isLength({ min: 5 }),
        body('email').isEmail(),
        body('password', 'should be atleast 5 digits').isLength({ min: 5 }),
    ],

    async (req, res) => {

        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password,salt)
        try {
            await user.create({
                name: req.body.name,
                email: req.body.email,
                password: secpassword,
                location: req.body.location
            })
            res.json({ success: true })
        }
        catch (err) {
            console.log(err)
            res.send({ success: false })

        }


    })
router.post("/loginuser",
    [

        body('email').isEmail(),
        body('password', 'should be atleast 5 digits').isLength({ min: 5 })
    ],

    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ err: err.array() });
        }
        let email = req.body.email;
        try {
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ err: "try loggin in with correct credentials" });
            }

         const checkpassword= await bcrypt.compare(req.body.password,userData.password)
           if (!checkpassword) {
                return res.status(400).json({ err: "try loggin in with other password" });
            }
            const data= {
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data , jwtSecret)


            return res.json({success:true , authToken:authToken})
        }
        catch (err) {
            console.log(err)
            res.send({ success: false })

        }
    })

module.exports = router;