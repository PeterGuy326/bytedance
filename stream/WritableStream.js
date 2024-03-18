// Writable Streams（可写流）：用于写入数据，例如将数据发送到文件、网络或其他可消费数据的地方。
// const { Writable } = require('stream');

// // 创建一个可写流
// const writableStream = new Writable({
//     write(chunk, encoding, callback) {
//         // 当有数据写入流时，会调用此函数
//         console.log('数据被写入:', chunk.toString());
//         callback(); // 调用 callback 时，可以传递一个错误作为参数，如果没有错误，则传递 null
//     }
// });

// // 写入数据到流中
// writableStream.write('Hello, ');
// writableStream.write('World!');
// writableStream.end(); // 结束流，表示没有更多数据要写入

const fs = require('fs');

// 创建一个可写流，用于写入文件
const writableStream = fs.createWriteStream('output.txt');

// 写入一些数据到流中
writableStream.write('这是一些写入到文件的文本。');

// 结束流并关闭文件
writableStream.end('这是流结束时写入的文本。', 'utf8', () => {
    console.log('文件写入完成。');
});

// 处理流错误事件
writableStream.on('error', (err) => {
    console.error('写入文件时发生错误:', err);
});