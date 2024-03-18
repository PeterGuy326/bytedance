/**
 * 初始化两个数组 l_max 和 r_max，它们分别用于存储每个位置左侧和右侧的最高柱子高度。
    首先，遍历数组 height，使用两个 for 循环分别计算每个位置左侧和右侧的最高柱子高度，并更新 l_max 和 r_max 数组。
    然后，遍历数组 height，计算每个位置能接的雨水量。雨水量由当前位置的柱子高度与左侧和右侧最高柱子高度中的较小值决定，即 Math.min(l_max[i], r_max[i])。
    如果这个值大于当前位置的柱子高度 height[i]，则可以接雨水，否则不能接雨水。
    将所有能接的雨水量累加，得到总的雨水容量 maxCapacity。
    
    这个算法的时间复杂度是 O(n)，其中 n 是数组 height 的长度。这是因为算法只需要遍历数组三次（一次用于初始化 l_max，一次用于更新 r_max，一次用于计算雨水量）。
    这并不是一个暴力搜索，因为它没有尝试所有可能的组合或路径，而是利用了问题的特性（即每个位置的雨水量只与其自身和左右两侧的最高柱子高度有关）来优化计算。
    同时，它也没有使用备忘录技术，因为它没有存储任何子问题的解来避免重复计算。
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let l_max = [], r_max = [];
    let len = height.length;
    let maxCapacity = 0;
    for (let i = 0; i < len; i++) {
        l_max[i] = height[i];
        r_max[i] = height[i];
    }
    for (let i = 1; i < len; i++) {
        l_max[i] = Math.max(l_max[i - 1], height[i]);
    }
    for (let j = len - 2; j >= 0; j--) {
        r_max[j] = Math.max(r_max[j + 1], height[j]);
    }
    for (let i = 0; i < len; i++) {
        maxCapacity += Math.min(l_max[i], r_max[i]) - height[i];
    }
    return maxCapacity;
};