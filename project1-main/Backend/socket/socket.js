const { Server } = require("socket.io");
const express = require('express');
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors :
    {
        origin : ["http://localhost:3000","https://chat-app-three-khaki.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})

const getReceiverSocketID = (receiverID) =>
{
    return userSocketMap[receiverID];
}

const userSocketMap = {};

io.on('connection', (socket) =>
{
    console.log("A user connected", socket.id);
    
    const userID = socket.handshake.query.userID;

    if(userID != "undefined")
    {
        userSocketMap[userID] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () =>
    {
        console.log("A user disconnected", socket.id)
        delete userSocketMap[userID];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

module.exports = {app, io, server, getReceiverSocketID};