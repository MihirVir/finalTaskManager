const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const login = async (req, res) => {
    if (!req.body.username || !req.body.password ) {
        res.status(301).json({
            message: "error",
            message: "Please enter a username or a password"
        })
    }
    let user = await User.findOne({username: req.body.username});
    console.log(user);
    if (user) {
        let comparing = await bcrypt.compare(req.body.password, user.password);
        console.log(comparing)
        if (comparing) {
            return res.status(200).json({
                message: "logged in",
                token: jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
            })
        }
    } 
    return res.status(301).json({
        message: "Enter correct email id or password"
    })
    
   
}
const pp = [
    {
        name: "Mihir",
        message: "What"
    },
    {
        name: "Kyle",
        message: "Not"
    },
    {
        name: "Gawin",
        message: "New Token Works"
    }
]
const posts = (req, res) => {
    res.json(pp.filter(post => post.name === req.user.username));
}
const  authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        return res.status(401).json({
            msg: "token not sent"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({
                msg: "wrong token"
            })
        }
        req.user = user
        next();
    })
} 

const addUser = async (req,res) => {
    try {
        
        let user = await User.findOne({username: req.body.username});
        const salt = await bcrypt.genSalt(10);
            
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(user);
        if (user === null) {
            console.log(user);
            let createUser = await User.create({username: req.body.username, password: hashedPassword});
            return res.status(201).json({
                createUser: createUser
            })
        }
        return res.status(400).json({
            message: "error creating the user"
        })
    } catch(err) {
        if (err) {
            console.log(err);
        }
        return res.status(500).json({
            message: "Internal Server Error",
            
        })
    }
}
module.exports = {
    login,
    addUser,
    authenticateToken,
    posts
}
