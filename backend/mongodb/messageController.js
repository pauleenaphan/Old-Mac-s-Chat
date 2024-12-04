const express = require('express');
const router = express.Router();

const Message = require("../mongodb/messageModel");

router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find(); // Fetch all messages from MongoDB
        res.json(messages); // Return the messages as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;