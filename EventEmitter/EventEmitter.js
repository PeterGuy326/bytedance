const { EventEmitter } = require('events');

// 创建一个新的EventEmitter实例
const myEmitter = new EventEmitter();

// 定义一个事件 'event' 并为其设置监听器
myEmitter.on('event', (arg1, arg2) => {
    console.log(`事件监听器收到的参数: ${arg1}, ${arg2}`);
});

// 定义另一个事件 'error' 并为其设置监听器
myEmitter.on('error', (err) => {
    console.error('出错了:', err);
});

// 触发 'event' 事件，并传递参数
myEmitter.emit('event', 'Hello', 'World');

// 触发 'error' 事件，并传递一个错误对象
myEmitter.emit('error', new Error('出错了!'));