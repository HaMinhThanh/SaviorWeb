const User = require('../models/User.model');

const authAdmin = async (req, res, next) => {
    try {
        //req.user=user
        const user = await User.findById(req.user.id);

        // const user = await User.findOne({ _id: req.user.id });

        if (user.role === 0) {
            return res.status(400).json({ msg: 'Admin resource access denied' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = authAdmin;
