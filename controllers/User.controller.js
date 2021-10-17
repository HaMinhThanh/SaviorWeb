const User = require("../models/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtocken");


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

            const user = await newUser.save();

            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });

            // creat new cookie
            //res.cookie(name,value[,options])
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,                 //Only access by web server
                path: '/user/refresh_token',    //path of cookie, default is '/'
                maxAge: 7 * 24 * 60 * 60 * 1000 //7day => ms
            });

            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.msg });
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