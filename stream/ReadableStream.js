// Readable Streams（可读流）：用于读取数据，例如从文件、网络或任何可提供数据的地方
const { Readable } = require('stream');
const fs = require('fs');

// 创建一个可读流
// const readableStream = new Readable({
//     read(size) {
//         // 当流需要数据时，会调用此函数
//         // 你可以在这里生成数据，然后使用 this.push() 方法将数据添加到流中
//         this.push('some data ');
//         this.push('to be read');
//         // 当没有更多数据时，你需要调用 this.push(null) 来结束流
//         this.push(null);
//     }
// });

// 创建一个可读流，用于读取文件
const readableStream = fs.createReadStream('example.txt', 'utf8');

// 使用管道将文件内容传输到控制台
readableStream.pipe(process.stdout);

// 当数据可读时触发。此时可以调用 read() 方法读取数据。
readableStream.on('data', () => {
    console.log('当数据可读时触发');
    // 此时可以调用 read() 方法读取数据。
});

// 处理流结束事件
readableStream.on('end', () => {
    console.log('文件传输完成。');
});

// 处理流错误事件
readableStream.on('error', (err) => {
    console.error('读取文件时发生错误:', err);
});

// 当流被关闭时触发
readableStream.on('close', (err) => {
    console.error('当流被关闭时触发:', err);
});
