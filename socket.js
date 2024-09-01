import { Server as WebSocketServer } from 'socket.io';

const setupSocket = (server) => {
    const io = new WebSocketServer(server, {
        cors: {
            origin: ["http://localhost:5173","//chat-box-frontend-sigma.vercel.app/"],// Replace with your frontend URL
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('send-message', (recipentSocketId,message) => {
            socket.to(recipentSocketId).emit('receive-message', message);
            console.log(`Message: ${message}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default setupSocket;
