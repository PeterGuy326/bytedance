// 中间件 A
function middlewareA(ctx, next) {
    console.log('Middleware A');
    // 执行下一个中间件
    next();
    console.log('Middleware A1');
}

// 中间件 B
function middlewareB(ctx, next) {
    console.log('Middleware B');
    // 执行下一个中间件
    next();
    console.log('Middleware B1');
}

// 中间件 C
function middlewareC(ctx, next) {
    console.log('Middleware C');
    // 执行下一个中间件
    next();
    console.log('Middleware C1');
}

// 创建一个中间件数组
const middlewares = [middlewareA, middlewareB, middlewareC];

// function compose(ctx, next) {
//     // 模拟 koa 的洋葱模型执行过程
//     let index = middlewares.length
//     function next() {
//         if (index--) {
//             const middleware = middlewares[index]
//             middleware(ctx, next)
//         }
//     }
//     next()
// }

function compose(ctx, callback) {
    // 模拟 koa 的洋葱模型执行过程
    let index = 0
    function next() {
        if (index < middlewares.length) {
            const middleware = middlewares[index];
            index++; // 移动到下一个中间件
            middleware(ctx, next); // 执行当前中间件，并将 run 函数作为参数传递
        } else {
            // 所有中间件都执行完毕后调用回调函数
            callback();
        }
    }
    next()
}

const ctx = {
    method: 'GET',
    url: 'http://example.com'
}

// 运行中间件栈
compose(ctx, () => {
    console.log('所有中间件执行完毕')
})

/** 
 * Middleware A 的“进入”逻辑首先被执行。
 * 然后 Middleware A 调用 next()，控制流进入下一个中间件 Middleware B。
 * Middleware B 的“进入”逻辑被执行。
 * Middleware B 调用 next()，控制流进入下一个中间件 Middleware C。
 * Middleware C 的“进入”逻辑被执行。
 * Middleware C 调用 next()，此时没有更多的中间件可以进入，所以控制流开始返回。
 * Middleware C 的“离开”逻辑 Middleware C1 被执行。
 * 控制流返回到 Middleware B，执行 Middleware B 的“离开”逻辑 Middleware B1。
 * 控制流继续返回到 Middleware A，执行 Middleware A 的“离开”逻辑 Middleware A1。
 * 最后，所有中间件的“离开”逻辑都执行完毕，执行传递给 compose 函数的回调函数，打印出“所有中间件执行完毕”。
*/