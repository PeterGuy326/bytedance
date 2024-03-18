class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // 保存键值对
        this.freqMap = new Map(); // 保存访问频率
        this.minFreq = 0; // 最小访问频率
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        const value = this.cache.get(key);
        const freq = this.freqMap.get(key);

        // 更新访问频率
        this.freqMap.set(key, freq + 1);
        this.updateMinFreq();

        return value;
    }

    put(key, value) {
        if (this.capacity === 0) return;

        if (this.cache.has(key)) {
            // 更新值和访问频率
            this.cache.set(key, value);
            this.freqMap.set(key, this.freqMap.get(key) + 1);
        } else {
            // 检查是否达到容量限制
            if (this.cache.size >= this.capacity) {
                this.evict(); // 淘汰访问频率最低的键
            }

            // 添加新键值对和访问频率
            this.cache.set(key, value);
            this.freqMap.set(key, 1);
            this.minFreq = 1; // 新添加的键访问频率为 1
        }

        this.updateMinFreq();
    }

    evict() {
        const minFreqKeys = this.freqMap.get(this.minFreq);
        const evictKey = minFreqKeys.keys().next().value;
        minFreqKeys.delete(evictKey);
        this.cache.delete(evictKey);
    }

    updateMinFreq() {
        if (this.freqMap.size === 0) return;

        // 找到当前最小访问频率
        const freqKeys = this.freqMap.get(this.minFreq);
        if (!freqKeys || freqKeys.size === 0) {
            this.minFreq++; // 如果当前最小频率没有键，增加最小频率
        }
    }
}

// 示例使用
const lfuCache = new LFUCache(2); // 创建容量为 2 的 LFU 缓存
lfuCache.put(1, 1); // 缓存中：{1: 1}（访问频率为 1）
lfuCache.put(2, 2); // 缓存中：{1: 1, 2: 2}（访问频率为 1）
console.log(lfuCache.get(1)); // 返回 1，缓存中：{1: 1, 2: 2}（访问频率为 2）
lfuCache.put(3, 3); // 缓存中：{1: 1, 3: 3}（访问频率为 1）（键 2 被淘汰）
console.log(lfuCache.get(2)); // 返回 -1（键 2 不在缓存中）
console.log(lfuCache.get(3)); // 返回 3，缓存中：{1: 1, 3: 3}（访问频率为 2）