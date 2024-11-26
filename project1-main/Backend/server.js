const express = require('express');
const dotenv = require('dotenv');
const path = require('path')

const authRoutes = require('../Backend/routes/authRoutes');
const messageRoutes = require('../Backend/routes/messageRoutes.js');
const userRoutes = require('../Backend/routes/userRoutes.js');

const { connectToMongoDB } = require('../Backend/db/connectToMongoDB');
const cookieParser = require('cookie-parser');

const { app, server } = require('../Backend/socket/socket.js');

__dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 5000;


app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:3000", "https://chat-app-three-khaki.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],

}));



app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);


app.use(express.static(path.join(__dirname, "/Frontend/dist")))

app.get("*", (req, res) =>
{
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})


server.listen(PORT, () => 
{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);
})

