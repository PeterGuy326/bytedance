const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// 允许静态文件访问，假设你的 HTML 文件位于 public 目录
app.use(express.static('public'));

// 当用户连接到服务器时
io.on('connection', (socket) => {
    console.log('a user connected');

    // 当用户发送消息
    socket.on('chat message', (msg) => {
        // 广播消息给所有连接的客户端
        io.emit('chat message', msg);
    });

    // 当用户断开连接
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});