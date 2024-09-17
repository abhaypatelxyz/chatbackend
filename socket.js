import { Server as WebSocketServer } from 'socket.io';

const setupSocket = (server) => {
    const io = new WebSocketServer(server, {
        cors: {
            // origin: "https://chat-box-frontend-sigma.vercel.app/",
            origin: "https://chat-box-frontend-sigma.vercel.app",
            methods: ["GET", "POST"],
            credentials: true // Allow credentials (cookies, authorization headers, etc.)
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
