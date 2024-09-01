import express from 'express';
import http from 'http';
import cors from 'cors';

// Create Express app
const app = express();
const server = http.createServer(app);

// CORS policy setup
const allowedOrigins = [
  'https://www.bharatlinker.shop',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
    // Bad request due to invalid JSON
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export { app, server };
