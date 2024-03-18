// 假设的 fetch 函数，用于发起请求
async function fetch(url) {
    // 这里应该是发起请求的代码，例如使用 axios 或 fetch API
    // 为了示例，我们只是返回一个模拟的 Promise
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Response from ${url}`);
        }, 1000);
    });
}

class RequestQueue {
    constructor(concurrecy = 3) {
        this.concurrecy = concurrecy
        this.queue = []
        this.activeCount = 0
        this.processQueue = async (task) => {
            try {
                await task()
            } catch (error) {
                console.error('请求执行出错：', error)
            } finally {
                this.activeCount--
                // 执行下一个
                this.executeNext()
            }
        }
    }

    // 添加请求到队列
    enqueue(task) {
        this.queue.push(task)
        // 执行下一个任务
        this.executeNext()
    }

    // 执行下一个任务
    executeNext() {
        if (this.activeCount < this.concurrecy && this.queue.length > 0) {
            const task = this.queue.shift()
            this.activeCount++
            this.processQueue(task)
        }
    }
}

// 创建队列实例
const requestQueue = new RequestQueue(3)

for (let i = 0; i < 10; i++) {
    requestQueue.enqueue(() => fetch(`https://example.com/data${i}`))
}

// 当所有请求都处理完毕后
requestQueue.enqueue(() => {
    console.log('所有请求已完成');
});