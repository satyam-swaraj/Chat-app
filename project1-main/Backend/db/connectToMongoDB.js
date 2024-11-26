const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToMongoDB()
{
    try
    {
        await mongoose.connect(MONGODB_URI);
        console.log("Connect To MongoDB");
    }
    catch(error)
    {
        console.log("Error in connecting MongoDB")
        console.log(error.message);
    }
}

module.exports = { connectToMongoDB };