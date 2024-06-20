const User = require('../models/userModel.js');

// require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { response } = require('express');


// function to create token
function createToken(_id) {
    return jwt.sign({ id: _id }, process.env.JWT_SECRET_KEY)
}


// function to register user
async function handleRegisterUser(req, res) {
    const { name, email, password } = req.body;

    try {
        // checing if user is already registered
        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            });
        }

        // validating email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // create a token with user's id
        const token = createToken(user._id);

        // send token in the response
        return res.status(201).json({ success: true, token });

    } catch (err) {
        console.log('Error at handleRegisterUser:', err);
        return res.status(500).json({ success: false, error: 'Error' })
    }
};



// function to login user
async function handleLoginUser(req, res) {
    const { email, password } = req.body;

    try {
        // check if user exists
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'No user with this email address'
            })
        }

        // if email is correct, then check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                sucess: 'false',
                error: 'Invalid password'
            });
        };

        // if email and password are correct, then generate toke and send as response
        const token = createToken(user._id);
        return res.status(200).json({ success: true, token });
    } catch (err) {
        console.log(`Error at handleLoginUSer: ${err}`);
        return res.status(500).json({ success: false, error: 'Error' });
    }
}



module.exports = {
    handleLoginUser,
    handleRegisterUser
};