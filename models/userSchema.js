import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the Friend Request schema
const friendRequestReceivedSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Enum for request status
        default: 'pending' // Default status when the request is created
    }
});


const friendRequestSendSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Enum for request status
        default: 'pending' // Default status when the request is created
    }
});

// Define the User schema
const userSchema = new Schema(
    {
        userName: {
            type: String
        },
        firstName: {
            type: String,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        mobileNumber: {
            type: String
        },
        email: {
            type: String,
        },
        contact: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        friendRequestSend: [friendRequestSendSchema], // Embed the Friend Request schema here,
        friendRequestReceived: [friendRequestReceivedSchema], // Embed the Friend Request schema here
        isOnline: {
            type: Boolean,
            enum: [0, 1]
        },
        uid: {
            type: String,
            required: true
        },
        socketId: {
            type: String
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
