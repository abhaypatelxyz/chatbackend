import { Server as WebSocketServer } from 'socket.io';

const setupSocket = (server) => {
    const io = new WebSocketServer(server, {
        cors: {
            origin: ["http://localhost:5173", "https://chat-box-frontend-sigma.vercel.app"], // Replace with your frontend URLs
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        // Handle the 'send-message' event to forward messages to the recipient
        socket.on('send-message', (recipientSocketId, message) => {
            socket.to(recipientSocketId).emit('receive-message', message);
            console.log(`Message: ${message}`);
        });

        // Log when a user disconnects
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default setupSocket;
