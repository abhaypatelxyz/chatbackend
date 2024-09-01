import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Define the Message schema to be used in the chat
const messageSchema = new Schema({
    content: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Define the Chat schema
const chatSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: [messageSchema]
}, {
    timestamps: true
});
export const Chat = mongoose.model('Chat', chatSchema);
