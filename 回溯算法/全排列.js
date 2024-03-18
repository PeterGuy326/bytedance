/**
 * @desc 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const result = [];
    function backtrack(temp) {
        if (temp.length === nums.length) {
            result.push([...temp]);
        } else {
            for (let num of nums) {
                if (!temp.includes(num)) {
                    temp.push(num);
                    backtrack(temp);
                    temp.pop();
                }
            }
        }
    }

    backtrack([]);
    
    return result;
};

// 示例
const nums = [1, 2, 3];
console.log(permute(nums));