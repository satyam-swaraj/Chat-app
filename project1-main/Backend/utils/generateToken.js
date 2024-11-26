const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const environment = process.env.NODE_ENVIRONMENT;

const generateTokenAndSetCookie = (userID, res) =>
{
    const token = jwt.sign({userID}, jwtSecretKey, 
        {
            expiresIn : '15d',
        }
    )

    res.cookie("jwt", token, {
        maxAge : 15 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : "strict",
        secure : environment !== 'development'
    })

    return token;
}

module.exports = { generateTokenAndSetCookie };