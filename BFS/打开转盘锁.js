/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
    if (target === '0000') { // 如果目标密码就是初始密码 '0000'，则返回 0。
        return 0;
    }

    // 创建一个 Set 来存储死亡密码列表，如果初始密码 '0000' 在死亡密码列表中，则返回 -1。
    const dead = new Set(deadends);
    if (dead.has("0000")) {
        return -1;
    }

    // 初始化步数 step 为 0，创建一个队列 queue 用于广度优先搜索，
    // 将初始密码 '0000' 放入队列中，并创建一个 Set seen 用于记录已经遍历过的密码。
    let step = 0;
    const queue = [];
    queue.push("0000");
    const seen = new Set();
    seen.add("0000");


    while (queue.length) {
        ++step;
        const size = queue.length;
        for (let i = 0; i < size; ++i) {
            const status = queue.shift();
            for (const nextStatus of get(status)) {
                if (!seen.has(nextStatus) && !dead.has(nextStatus)) {
                    if (nextStatus === target) {
                        return step;
                    }
                    queue.push(nextStatus);
                    seen.add(nextStatus);
                }
            }
        }
    }

    return -1;
};

const numPrev = (x) => {
    return x === '0' ? '9' : (parseInt(x) - 1) + '';
}

const numSucc = (x) => {
    return x === '9' ? '0' : (parseInt(x) + 1) + '';
}

// 枚举 status 通过一次旋转得到的数字
const get = (status) => {
    const ret = [];
    const array = Array.from(status);
    for (let i = 0; i < 4; ++i) {
        const num = array[i];
        array[i] = numPrev(num);
        ret.push(array.join(''));
        array[i] = numSucc(num);
        ret.push(array.join(''));
        array[i] = num;
    }

    return ret;
}

console.log(openLock(["0201","0101","0102","1212","2002"], "0202"))