import express from 'express';
import http from 'http';
import cors from 'cors';
import os  from 'os';
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
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',').pop().trim() : req.connection.remoteAddress || req.socket.remoteAddress;
  res.send(`Your IP address is ${ip}`);
});


// function getServerIp() {
//   const interfaces = os.networkInterfaces();
//   for (let interfaceName in interfaces) {
//     for (let iface of interfaces[interfaceName]) {
//       // Check if the address is IPv4 and not internal (e.g., not localhost)
//       if (iface.family === 'IPv4' && !iface.internal) {
//         return iface.address;
//       }
//     }
//   }
//   return 'Unable to determine IP address';
// }

// app.get('/', (req, res) => {
//   const serverIp = getServerIp();
//   res.send(`Server IP address is ${serverIp}`);
// });


//ROUTERS
import userRouter from './api/routes/userRouter.js'
import chatRouter from './api/routes/chatRouter.js'
import friendRouter from './api/routes/friendRouter.js'
app.use('/api', userRouter);
app.use('/api', chatRouter);
app.use('/api', friendRouter);

export { app, server };
