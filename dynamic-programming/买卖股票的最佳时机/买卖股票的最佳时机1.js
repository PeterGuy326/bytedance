/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) { // 暴力法
    let maxprofit = 0
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            let profit = prices[j] - prices[i];
            if (profit > maxprofit) {
                maxprofit = profit;
            }
        }
    }
    return maxprofit
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]))

var maxProfit1 = function (prices) { // 一次遍历
    let minprice = -1
    let maxprofit = 0
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minprice || minprice === -1) {
            minprice = prices[i];
        } else if (prices[i] - minprice > maxprofit) {
            maxprofit = prices[i] - minprice;
        }
    }
    return maxprofit
};