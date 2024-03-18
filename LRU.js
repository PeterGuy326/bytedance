class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.queue = []; // 使用数组模拟队列
    }

    get(key) {
        if (this.cache.has(key)) {
            // 如果键存在于缓存中，将其移到队列头部（表示最近被使用过）
            this.updateQueue(key);
            return this.cache.get(key);
        } else {
            return -1;
        }
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // 如果键已存在于缓存中，更新其值，并将其移到队列头部
            this.cache.set(key, value);
            this.updateQueue(key);
        } else {
            if (this.queue.length >= this.capacity) {
                // 如果缓存已满，删除队尾的键（最近最少使用的键）
                const delKey = this.queue.pop();
                this.cache.delete(delKey);
            }
            // 将新键值对加入缓存，并插入队列头部
            this.cache.set(key, value);
            this.queue.unshift(key);
        }
    }

    updateQueue(key) {
        // 将键移到队列头部
        const index = this.queue.indexOf(key);
        if (index !== -1) {
            this.queue.splice(index, 1);
            this.queue.unshift(key);
        }
    }
}

// 示例使用
const lruCache = new LRUCache(2); // 创建容量为 2 的 LRU 缓存
lruCache.put(1, 1); // 缓存中：[1, 1]
lruCache.put(2, 2); // 缓存中：[2, 2] -> [1, 1]
console.log(lruCache.get(1)); // 返回 1，缓存中：[1, 1] -> [2, 2]
lruCache.put(3, 3); // 缓存中：[3, 3] -> [1, 1]（因为键 2 是最近最少使用的）
console.log(lruCache.get(2)); // 返回 -1（键 2 不在缓存中）
lruCache.put(4, 4); // 缓存中：[4, 4] -> [3, 3]（因为键 1 是最近最少使用的）
console.log(lruCache.get(1)); // 返回 -1（键 1 不在缓存中）
console.log(lruCache.get(3)); // 返回 3，缓存中：[3, 3] -> [4, 4]
console.log(lruCache.get(4)); // 返回 4，缓存中：[4, 4] -> [3, 3]