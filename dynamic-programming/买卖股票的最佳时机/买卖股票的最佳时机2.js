let result // 最后总和

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) { // 暴力法
    let len = prices.length
    if (len < 2) return 0
    res = 0
    dfs(prices, 0, len, 0, res)
    return res
};

/**
 * 
 * @param {number[]} prices 股价数组
 * @param {number} index 当前是第几天，从 0 开始
 * @param {number} status  0 表示不持有股票，1表示持有股票，
 * @param {number} profit 当前收益
 */
const dfs = (prices, index, len, status, profit) => {
    if (index === len) {
        res = Math.max(res, profit)
        return;
    }

    dfs(prices, index + 1, len, status, profit)

    if (status === 0) {
        // 可以尝试转向 1
        dfs(prices, index + 1, len, 1, profit - prices[index])
    } else {
        // 此时 status == 1，可以尝试转向 0
        dfs(prices, index + 1, len, 0, profit + prices[index])
    }
}

console.log(maxProfit([[7, 1, 5, 3, 6, 4]]))

// 特殊解法只要增长就买入 - 贪心算法
var maxProfit1 = function (prices) {
    let len = prices.length
    if (len < 2) {
        return 0
    }

    let result = 0
    for (let i = 1; i < len; i++) {
        let diff = prices[i] - prices[i - 1]
        if (diff > 0) {
            result += diff
        }
    }
    return result
}
