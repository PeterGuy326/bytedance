const cluster = require('cluster');
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

/**
 * 使用场景
    1. 常见的一个场景，在服务中若需要执行 shell 命令，那么就需要开启一个进程
    2. 对于服务中涉及大量计算的，可以开启一个工作线程，由这个线程去执行，执行完毕再把结果通知给服务线程。
 */
for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // 生成新的工作进程，可以使用 IPC 和父进程通信
}

const worker = new Worker(__filename, {
    workerData: script
});
