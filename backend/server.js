const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();
const mongoose = require("mongoose");
const mongoDB_URL = process.env.MONGODB_URL;
const PORT = 3001;

const server = http.createServer(); // Simple HTTP server
const io = new Server(server); // Attach Socket.IO to the server

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle custom events
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg); // Broadcast the message to all clients
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

