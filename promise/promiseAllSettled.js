function myPromiseAllSettled(promises) {
    return new Promise((resolve, reject) => {
        if (!promises || promises.length === 0) {
            resolve([]); // 如果传入的数组为空，立即解决并返回空数组
            return;
        }

        let results = new Array(promises.length);
        let settledCount = 0;

        promises.forEach((promise, index) => {
            promise.then(
                value => {
                    results[index] = { status: 'fulfilled', value };
                    settled(promise);
                },
                reason => {
                    results[index] = { status: 'rejected', reason };
                    settled(promise);
                }
            );
        });

        function settled(promise) {
            settledCount++;
            if (settledCount === promises.length) {
                resolve(results);
            }
        }
    });
}

// 使用示例
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('Error');
const promise3 = Promise.resolve(3);

myPromiseAllSettled([promise1, promise2, promise3])
    .then(results => {
        console.log(results); // 输出: [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 'Error'}, {status: 'fulfilled', value: 3}]
    });