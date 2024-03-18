// Transform Streams（转换流）：是特殊的双工流，它们在读取数据的同时对数据进行转换，并将转换后的数据写入
const { Transform } = require('stream');

// 创建一个转换流
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        // 转换数据的逻辑
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

// 使用转换流
process.stdin.pipe(transformStream).pipe(process.stdout);