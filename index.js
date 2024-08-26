import { app, server } from './app.js';
import connectDB from './config/mongoDB.js';
import setupSocket from './socket.js';

setupSocket(server); // Setup Socket.IO with the server instance

const port =3000; // Allow port to be configured via environment variable

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed:', err);
    process.exit(1); // Exit with failure code
  });
