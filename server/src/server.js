import 'dotenv/config';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { configureCloudinary } from './config/cloudinary.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();
  configureCloudinary();

  const server = http.createServer(app);
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', socket => {
    socket.on('join_room', roomId => {
      socket.join(roomId);
    });
    socket.on('message', ({ roomId, message, user }) => {
      io.to(roomId).emit('message', { message, user, ts: Date.now() });
    });
    socket.on('disconnect', () => {});
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
