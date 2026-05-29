const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    try {
        if(!email || !password){
            return res.status(400).json({message: "Email and Password are required!"});
        }
        let userExists = await User.findOne({email: email});
        if(userExists){
            return res.status(400).json({message: "User with this email already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email:email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: "User registered successfully!"});
    } catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({message: "Server error during registration!"});
    }
})

router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        if(!email || !password){
            return res.status(400).json({message: "Email and Password are required!"});
        }

        let userExists = await User.findOne({email:email});
        if(!userExists){
            return res.status(400).json({message: "Invalid email or password!"});
        }

        const correctPassword = await bcrypt.compare(password, userExists.password);
        if(!correctPassword){
            return res.status(400).json({message: "Invalid email or password!"});  
        }

        const token = jwt.sign({
            email: userExists.email}, 
            process.env.JWT_SECRET, 
            {expiresIn: '1h'});

        res.status(200).json({message: "Login successful!", token: token});
    } catch(error){
        console.error("Error during login:", error);
        res.status(500).json({message: "Server error during login!"
        })
    }
})

module.exports = router;