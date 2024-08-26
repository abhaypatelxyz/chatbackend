import { User } from '../../models/userSchema.js';
import { Chat } from '../../models/chatSchema.js';

const sendMessage = async (req, res) => {
    try {
        const user1 = req.query.user1;
        const user2 = req.query.user2;
        const content = req.query.content;
        const sender = req.query.sender;

        if (!user1 || !user2 || !content || !sender) {
            res.status(400).send("Fields are missing");
        }

        let chat = await Chat.findOne({
            $or: [
                { user1: user1, user2: user2 },
                { user1: user2, user2: user1 }
            ]
        });

        if (!chat) {
            chat = new Chat({
                user1: user1,
                user2: user2,
                chat: []
            });
        }

        // Add the new message to the chat
        chat.chat.push({
            content: content,
            sender: sender, // Use sendId to identify who sent the message
            timestamp: new Date()
        });

        // Save the chat
        await chat.save();

        res.status(200).json({
            message: 'Message sent successfully',
            chat
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send("Server error: " + error.message);
    }
};
const getMessage = async (req, res) => {
    const user1 = req.query.user1;
    const user2 = req.query.user2;

    let chat = await Chat.findOne({
        $or: [
            { user1: user1, user2: user2 },
            { user1: user2, user2: user1 }
        ]
    })
    if (!chat) {
        chat = new Chat({
            user1: user1,
            user2: user2,
            chat: []
        });
    }

    // Save the chat
    await chat.save();

    res.status(200).json({
        message: 'Chat retrived successfully',
        chat
    });

};
export { sendMessage, getMessage };