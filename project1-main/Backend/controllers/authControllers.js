const bcryptjs = require('bcryptjs');

const User = require('../models/userModel');
const { generateTokenAndSetCookie } = require('../utils/generateToken');

module.exports.signup = async (req, res) =>
{
    try
    {
        const fullName = req.body.fullName;
        const userName = req.body.userName;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const gender = req.body.gender;

        if(password !== confirmPassword)
        {
            return res.status(400).json({error : "Password not matched"});
        }

        const ifUserExist = await User.findOne({userName});

        if(ifUserExist)
        {
            return res.status(400).json({error : "Username already exist"})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName : fullName,
            userName : userName,
            password : hashedPassword,
            gender : gender,
            profilePicture : gender === 'male' ? boyProfilePicture : girlProfilePicture 
        });

        if(newUser)
        {
            await generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                userName : newUser.userName,
                profilePicture : newUser.profilePicture
            });
        }
        else
        {
            return res.status(400).json({error : "Invalid user data"});
        }
    }
    catch(error)
    {
        console.log("Error Occured in signing up");
        console.log(error.message);
        res.status(400).json({error : "Internal server error"});
    }
}



module.exports.login = async (req, res) =>
{
    try
    {
        const userName = req.body.userName;
        const password = req.body.password;

        const user = await User.findOne({ userName });
        
        if(!user)
        {
            return res.status(404).json({error : "Username does not exist"});
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
       
        if(!isPasswordCorrect)
        {
            return res.status(401).json({error : "Password is incorrect"});
        }

        const token = generateTokenAndSetCookie(user._id, res);

        return res.status(201).json({
            _id : user._id,
            fullName : user.fullName,
            userName : user.userName,
            profilePicture : user.profilePicture
        })
    }
    catch(error)
    {
        console.log("Error Occured in login");
        console.log(error.message);
        res.status(400).json({error : "Internal server error"});
    }
}


module.exports.logout = (req, res) =>
{
    try
    {
        res.cookie("jwt", '', {maxAge : 0});
        res.status(201).json("Logout succesfully");
    }
    catch(error)
    {
        console.log("Error Occured in logout");
        console.log(error.message);
        res.status(400).json({error : "Internal server error"});
    }
}
