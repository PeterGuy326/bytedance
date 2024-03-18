/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS_1 = function (nums) {
    let maxLen = 0, n = nums.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = 1
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[i] + 1)
            }
        }
        maxLen = Math.max(maxLen, dp[i])
    }
    return maxLen
};

// 优化时间复杂度到 O(nlogn)，使用二分搜索和一个辅助的数据结构
/**
 * 1. 创建一个空的有序数组 tails，用于存储当前所有递增子序列的最小尾部元素
 * 2. 初始化 length 为 0，这个变量用来跟踪最长递增子序列的长度
 * 3. 遍历输入数组 nums 中的每个元素 num
 * 4. 对于每个元素 num，使用二分搜索在 tails 数组中找到它的正确位置 i，使得 tails[i-1] < num <= tails[i]。
 * 5. 如果 i 等于 length，说明 num 可以接在当前最长递增子序列的末尾，因此将 num 添加到 tails 数组的末尾，并更新 length
 * 6. 如果 i 小于 length，说明 num 可以替换掉 tails[i] 来形成一个更长的递增子序列，因此更新 tails[i] = num
 */
var lengthOfLIS = function (nums) {
    let tails = [];
    let length = 0;
    for (let num of nums) {
        let i = tails.binarySearch(num);
        if (i === length) {
            tails.push(num);
            length++;
        } else {
            tails[i] = num;
        }
    }
    return length;
};

// 自定义二分搜索方法
Array.prototype.binarySearch = function (target) {
    let left = 0;
    let right = this.length;
    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        if (this[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};