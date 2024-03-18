function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let remaining = promises.length;

        if (remaining === 0) {
            return resolve(results);
        }

        promises.forEach((promise, i) => {
            promise.then(
                (value) => {
                    results[i] = value;
                    remaining--;
                    if (remaining === 0) {
                        resolve(results);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
}

// 使用示例
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

myPromiseAll([promise1, promise2, promise3])
    .then(values => {
        console.log(values); // 输出: [1, 2, 3]
    })
    .catch(error => {
        console.error(error);
    });