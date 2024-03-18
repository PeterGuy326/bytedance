// then() - 用于指定当 Promise 被解决（fulfilled）或拒绝（rejected）时应该执行的回调函数。then() 方法可以接受两个参数，第一个是 Promise 成功解决时执行的函数，第二个是 Promise 失败时执行的函数。这两个参数都是可选的。
promise.then(
    function (value) {
        // 当 Promise 被解决时执行的代码
    },
    function (error) {
        // 当 Promise 被拒绝时执行的代码
    }
);

// catch() - 与 then() 方法的第二个参数类似，catch() 方法专门用于处理 Promise 被拒绝的情况。它返回一个新的 Promise，并且任何在 Promise 执行过程中抛出的错误都会被传递到 catch()
promise.catch(function (error) {
    // 处理错误
});

// finally() - 不管 Promise 最终状态如何（解决或拒绝），都会执行 finally() 方法中的回调函数。这通常用于清理工作，比如关闭数据库连接或者释放资源。
promise.finally(function () {
    // 无论成功或失败都会执行的清理代码
});

// Promise.all() - 接受一个 Promise 对象的数组作为参数，并返回一个新的 Promise 实例，该实例在所有传入的 Promise 对象都成功解决后才会解决，如果任何一个 Promise 失败，则立即拒绝。
Promise.all([promise1, promise2, promise3])
    .then(function (values) {
        // 所有 Promise 都成功解决
    })
    .catch(function (error) {
        // 至少一个 Promise 失败
    });

// Promise.allSettled 是 JavaScript 中的一个静态方法，它用于等待可迭代对象（如数组）中的所有 Promise 对象都被 settled（即已解决或已拒绝）。与 Promise.all 不同，Promise.allSettled 不会因为任何一个 Promise 被拒绝而立即停止等待其他 Promise 的结果，而是会继续等待所有给定的 Promise 完成，无论是解决还是拒绝。
let promises = [
    fetch('https://example.com/promise1.js'),
    fetch('https://example.com/promise2.js'),
    fetch('https://example.com/promise3.js')
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, i) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise at index ${i} fulfilled with ${result.value}`);
            } else if (result.status === 'rejected') {
                console.error(`Promise at index ${i} rejected with ${result.reason}`);
            }
        });
    });

// Promise.resolve() - 返回一个在指定值上解决的 Promise 对象。如果值是一个 Promise 实例，那么 Promise.resolve() 将立即返回该 Promise 实例。
let resolvedPromise = Promise.resolve('value');

// Promise.reject() - 返回一个在指定错误上拒绝的 Promise 对象。
let rejectedPromise = Promise.reject('error');