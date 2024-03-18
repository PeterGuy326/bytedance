/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 你可以认为每种硬币的数量是无限的。
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    if (amount === 0) return 0;

    // 用于存储每个金额所需的最少硬币数量。
    let dp = [];

    // 将dp数组的每个位置初始化为一个较大的数（amount + 1），表示不可能的硬币数
    for (let i = 0; i <= amount; i++) {
        dp[i] = amount + 1;
    }

    // 对于金额0，不需要任何硬币，所以dp[0]设置为0
    dp[0] = 0;

    // 外层循环遍历所有可能的金额，从0到amount
    for (let i = 0; i <= amount; i++) {
        // 内层循环遍历所有硬币面额
        for (let j = 0; j < coins.length; j++) {
            // 如果当前考虑的金额i大于等于硬币面额coins[j]，则可以考虑使用这个硬币
            if (i >= coins[j]) {
                // 更新dp[i]为使用硬币coins[j]后剩余金额的最小硬币数与当前dp[i]的较小值
                // 即dp[i - coins[j]] + 1（使用coins[j]硬币后剩余金额的最小硬币数）和dp[i]（不使用coins[j]硬币的最小硬币数）
                dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
            }
        }
    }

    // 最后，检查dp[amount]是否仍然为初始化时的不可能值（amount + 1）
    // 如果是，则说明没有找到组合可以达到总金额，返回-1
    // 否则，返回dp[amount]，即达到总金额所需的最少硬币数
    return dp[amount] === amount + 1 ? -1 : dp[amount];
};