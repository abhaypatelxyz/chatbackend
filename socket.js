import { Server as WebSocketServer } from 'socket.io';

const setupSocket = (server) => {
    const io = new WebSocketServer(server, {
        cors: {
            origin: [
                "http://localhost:5173",  // Local development
                "https://chat-box-frontend-sigma.vercel.app"  // Production frontend
            ],
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"], // Optional: Add headers if needed
            credentials: true // Optional: Allow credentials
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('send-message', (recipientSocketId, message) => {
            socket.to(recipientSocketId).emit('receive-message', message);
            console.log(`Message sent to ${recipientSocketId}: ${message}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
};

export default setupSocket;
