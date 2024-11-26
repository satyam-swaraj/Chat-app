const mongoose = require('mongoose');

const conservationSchema = new mongoose.Schema(
{
    participants :
    [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    message :
    [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Message',
            default : []
        }
    ]
},
{
    timestamps : true
}
);

const Conservation = mongoose.model("Conservation", conservationSchema);

module.exports = Conservation;