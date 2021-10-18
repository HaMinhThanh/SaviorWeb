const User = require("../models/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userController = {
    register: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user)
                return res.status(400).json({ msg: 'The email already exists.' });


            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            const saveUser = await newUser.save();

            const accesstoken = createAccessToken({ id: saveUser._id });
            const refreshtoken = createRefreshToken({ id: saveUser._id });

            // creat new cookie
            // res.cookie(name,value[,options])
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,                 //Only access by web server
                path: '/user/refresh_token',    //path of cookie, default is '/'
                maxAge: 7 * 24 * 60 * 60 * 1000 //7day => ms
            });

            res.status(200).json(saveUser);
        } catch (err) {
            console.log(err);
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(404).json("user not found");

            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword)
                return res.status(400).json("wrong password");

            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });

            // creat new cookie
            // res.cookie(name,value[,options])
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,                 //Only access by web server
                path: '/user/refresh_token',    //path of cookie, default is '/'
                maxAge: 7 * 24 * 60 * 60 * 1000 //7day => ms
            });

            res.status(200).json({ message: "login successfully!" });
        } catch (err) {
            res.status(500).json(err)
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
            return res.json({ message: "logged out" });

        } catch (err) {
            res.status(500).json(err)
        }
    },
    updateUserInfo: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    getUser: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    getAllUser: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    deleteUser: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    createUser: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    updateRole: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    updateUser: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    forgotPassword: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    resetPassword: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    changePassword: async (req, res) => {
        try {

        } catch (err) {

        }
    },
    refreshToken: async (req, res) => {
        try {

        } catch (err) {

        }
    }

};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7m' });
};

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userController;