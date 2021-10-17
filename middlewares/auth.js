const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        // Get token from Header request by client 
        const token = req.header("Authorization");

        // Check token exist
        if (!token)
            return res.status(400).json({ message: "Invalid Authentication" });

        // Vertify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(400).json({ message: "Invalid Authentication" });

            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = auth;