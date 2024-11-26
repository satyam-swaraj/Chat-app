const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const protectRoute = async(req, res, next) =>
{
    try
    {
        const token = req.cookies.jwt;
        
        if(!token)
        {
            return res.status(401).json({ error : "Unauthorized as token not provided"});
        }

        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const decoded = jwt.verify(token, jwtSecretKey);
        
        if(!decoded)
        {
            return res.status(401).json({ error : "Unauthorized as invalid token provided"});
        }

        const user = await User.findById(decoded.userID).select("-password");

        if(!user)
        {
            return res.status(404).json({ error : "User not found"});
        }

        req.user = user;

        next();
    }
    catch(error)
    {
        console.log('Error in protected routes');
        console.log(error.message);
        return res.status(500).json({error : "Internal server error"});
    }
}

module.exports = protectRoute;