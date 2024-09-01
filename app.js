import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import setupSocket from './socket.js';

dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);

// CORS policy setup
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send("Hello here");
});

// Import routers
import userRouter from './api/routes/userRouter.js';
import chatRouter from './api/routes/chatRouter.js';
import friendRouter from './api/routes/friendRouter.js';

// Use routers
app.use('/api', userRouter);
app.use('/api', chatRouter);
app.use('/api', friendRouter);

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Set up Socket.IO
setupSocket(server);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
