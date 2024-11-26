const Conservation = require('../models/conservationModel.js');
const Message = require('../models/messageModel');
const { getReceiverSocketID, io } = require('../socket/socket');

module.exports.sendMessage = async (req, res) =>
{
    try
    {
        const { message } = req.body;
        const { id : receiverID } = req.params;
        const senderID = req.user._id;

        let conservation = await Conservation.findOne({
            participants : { $all : [senderID, receiverID] },
        });

        if(!conservation)
        {
            conservation = await Conservation.create({
                participants : [senderID, receiverID],
            });
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            message
        });

        if(newMessage)
        {
            conservation.message.push(newMessage._id);
        }

        await Promise.all([conservation.save(), newMessage.save()]);

        const receiverSocketID = getReceiverSocketID(receiverID)
        if(receiverSocketID)
        {
            io.to(receiverSocketID).emit("newMessage", newMessage);
        }

        return res.status(200).json(newMessage);
    }
    catch(error)
    {
        console.log("Error in message controller");
        console.log(error.message);
        return res.status(500).json({error : "Internal server error"});
    }
}


module.exports.getMessages = async (req, res) =>
{
    try
    {
        const { id : userToChatID } = req.params;
        const senderID = req.user._id;

        const conservation = await Conservation.findOne({
            participants : { $all : [senderID, userToChatID] },
        }).populate("message");

        if(!conservation)
        {
            return res.status(200).json([]);
        }

        return res.status(200).json(conservation.message)
    }
    catch(error)
    {
        console.log("Error in getting message controller");
        console.log(error.message);
        return res.status(500).json({error : "Internal server error"});
    }
}
