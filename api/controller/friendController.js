import { User } from '../../models/userSchema.js';

const sendFriendRequest = async (req, res) => {
    const receiver=req.query.receiver;
    const sender=req.query.sender;

    if (!receiver || !sender) {
        return res.status(400).send("Receiver and Sender are required");
    }

    try {
        const updatedReceiver = await User.findOneAndUpdate(
            { _id: receiver },
            { 
                $addToSet: { 
                    friendRequestReceived: {
                        sender: sender,
                        status: 'pending'
                    }
                }
            },
            { new: true, runValidators: true }
        );
        const updateSender = await User.findOneAndUpdate(
            { _id: sender },
            { 
                $addToSet: { 
                    friendRequestSend: {
                        receiver: receiver,
                        status: 'pending'
                    }
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedReceiver) {
            return res.status(404).send("Receiver not found");
        }

        res.status(200).json({
            message: "Friend request sent successfully",
            receiver: updatedReceiver
        });
    } catch (error) {
        console.error("Error in sending friend request:", error);
        res.status(500).send("Server Error");
    }
};
const acceptFriendRequest = async (req, res) => {
    
    const receiver=req.query.receiver;
    const sender=req.query.sender;


    if (!sender || !receiver) {
        return res.status(400).send("Sender and Receiver are required");
    }

    try {
        // Add the receiver to the sender's contact list
        const updateSender = await User.findOneAndUpdate(
            { _id: sender },
            { $addToSet: { contact: receiver } },
            { new: true, runValidators: true }
        );

        // Add the sender to the receiver's contact list
        const updateReceiver = await User.findOneAndUpdate(
            { _id: receiver },
            { $addToSet: { contact: sender } },
            { new: true, runValidators: true }
        );

        // Update the friend request status to 'accepted' in the receiver's friendRequests array
        const updatedReceiver = await User.findOneAndUpdate(
            { _id: receiver, 'friendRequestReceived.sender': sender },
            { $set: { 'friendRequestReceived.$.status': 'accepted' } },
            { new: true, runValidators: true }
        );

        const updatedSender = await User.findOneAndUpdate(
            { _id: sender, 'friendRequestSend.receiver': receiver },
            { $set: { 'friendRequestSend.$.status': 'accepted' } },
            { new: true, runValidators: true }
        );


        if (!updateSender || !updateReceiver || !updatedReceiver ||!updatedSender) {
            return res.status(404).send("User(s) or Friend Request not found");
        }

        res.status(200).json({
            message: "Friend request accepted successfully",
            sender: updateSender,
            receiver: updateReceiver
        });
    } catch (error) {
        console.error("Error in accepting friend request:", error);
        res.status(500).send("Server Error");
    }
};
const rejectFriendRequest = async (req, res) => {
    
    const receiver=req.query.receiver;
    const sender=req.query.sender;


    if (!sender || !receiver) {
        return res.status(400).send("Sender and Receiver are required");
    }

    try {
       

        // Update the friend request status to 'accepted' in the receiver's friendRequests array
        const updatedReceiver = await User.findOneAndUpdate(
            { _id: receiver, 'friendRequestReceived.sender': sender },
            { $set: { 'friendRequestReceived.$.status': 'rejected' } },
            { new: true, runValidators: true }
        );

        const updatedSender = await User.findOneAndUpdate(
            { _id: sender, 'friendRequestSend.receiver': receiver },
            { $set: { 'friendRequestSend.$.status': 'rejected' } },
            { new: true, runValidators: true }
        );


        if (!updatedReceiver ||!updatedSender) {
            return res.status(404).send("User(s) or Friend Request not found");
        }

        res.status(200).json({
            message: "Friend request rejected successfully"
        });
    } catch (error) {
        console.error("Error in rejecting friend request:", error);
        res.status(500).send("Server Error");
    }
};

export {sendFriendRequest,acceptFriendRequest,rejectFriendRequest}