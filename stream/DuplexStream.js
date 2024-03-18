// Duplex Streams（双工流）：既可以读取数据也可以写入数据，例如 TCP 流
const { Duplex } = require('stream');

// 创建一个双工流
const duplexStream = new Duplex({
    read(size) {
        // 读取数据的逻辑
    },
    write(chunk, encoding, callback) {
        // 写入数据的逻辑
        console.log('数据被写入:', chunk.toString());
        callback();
    }
});

// 使用双工流
duplexStream.write('some data');
duplexStream.end();