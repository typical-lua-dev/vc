const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Статическая папка для клиентских файлов
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Новое подключение:', socket.id);

  socket.on('audio', (audioData) => {
    socket.broadcast.emit('audio-stream', audioData);
  });

  socket.on('disconnect', () => {
    console.log('Клиент отключен:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});