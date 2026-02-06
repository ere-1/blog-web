const Post = require('./../models/Post');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const path = require('path');
const jwtSecret = process.env.JWT_SECRET;
const adminLayout = path.join(__dirname, "..", "..", "views", "layouts", "admin");

const authMiddleware = async (req,res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
           return res.redirect('/')
        }
        const decoded = jwt.verify(token, jwtSecret);
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.redirect('/')
    }
}


const getAdminPage = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
       return res.render('admin/index', {layout: adminLayout, availableToken: false});
    }
   return res.render('admin/index', {layout: adminLayout, availableToken: true});
}


const PostAdminPage = async (req,res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username})
        if (!user) {
             return res.status(401).json({message: 'invalid username or password'})
        }
        const isPasswordAviliable = await bcrypt.compare(password, user.password);
        if (!isPasswordAviliable) {
            return res.status(401).json({message: 'invalid username or password'})
        }
        const token = jwt.sign({userId: user._id}, jwtSecret);
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error);
    }
}

const getDashboardPage = async (req,res) => {
    try {
        res.render('admin/dashboard', {layout: adminLayout});
    } catch (error) {
        
    }
}

const PostAdminPageRegister = async (req,res) => {
    try {
        const {username, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user  = await User.create({username, password: hashPassword});
        res.status(201).json({message: 'User created', user});

    } catch (error) {
        if (error.code == 1100) {
            res.status(409).json({message: 'User Already created'});
        }
    }
}

module.exports = {
    getAdminPage,
    PostAdminPage,
    PostAdminPageRegister,
    getDashboardPage,
    authMiddleware
}