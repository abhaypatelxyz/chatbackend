import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

//cors policy
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




app.use(express.json());
app.get('/', (req, res) => {
  res.send("Hello here");
});
//ROUTERS
import userRouter from './api/routes/userRouter.js'
import chatRouter from './api/routes/chatRouter.js'
import friendRouter from './api/routes/friendRouter.js'
app.use('/api', userRouter);
app.use('/api', chatRouter);
app.use('/api', friendRouter);

export { app, server };
