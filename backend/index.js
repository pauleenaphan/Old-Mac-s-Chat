const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

require('dotenv').config();
const mongoose = require("mongoose");
const mongoDB_URL = process.env.MONGODB_URL;
const PORT = 3000;

const { getTodaysDate } = require("./utils/helper");
const Message = require("./mongodb/messageModel"); // msg model
const messageRoutes = require('./mongodb/messageController'); //msg route

const app = express();
const server = http.createServer(app); 

app.use(cors({
    origin: 'https://oldmacschat.netlify.app', // Allow only your frontend to connect
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(messageRoutes);

const io = new Server(server, {
    cors: {
        origin: 'https://oldmacschat.netlify.app',  // Allow only your React frontend
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type']
    }
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle custom and incoming events
    socket.on('message', async (msg) => {
        console.log('Message received:', msg);

        // Saves msg to mongodb
        const newMsg = new Message({
            content: msg,
            date: getTodaysDate()
        })
        const savedMsg = await newMsg.save();

        io.emit('message', { content: savedMsg.content, date: savedMsg.date });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

mongoose.connect(mongoDB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

