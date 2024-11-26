const User = require("../models/userModel");

module.exports.getUsersForSidebar = async (req, res) =>
{
    try
    {
        const loggedInUserID = req.user._id;

        const filteredUsers = await User.find({ _id : { $ne : loggedInUserID}});

        return res.status(200).json(filteredUsers);
    }
    catch(error)
    {
        console.log("Error in getting Users");
        console.log(error.message);
        res.status(500).json({error : 'Internal server error'});
    }
}