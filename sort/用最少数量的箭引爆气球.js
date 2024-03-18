/**
 * @param {number[][]} points 一个二维数组，每个数组包含两个数字，表示箭矢的位置 (x, y)
 * @return {number} 返回能够射击到最多目标的最小箭矢数量
 */
var findMinArrowShots = function (points) {
    // 如果没有箭矢，直接返回0
    if (points.length === 0) return 0;

    // 根据箭矢的飞行距离（y坐标）对箭矢进行升序排序
    points.sort((a, b) => a[1] - b[1]);

    // 初始化箭矢数量计数器
    let cnt = 1;

    // 初始化结果数组，用于存储能够射击到最多目标的箭矢位置
    let resArr = [points[0]];

    // 初始化当前箭矢和上一个箭矢的变量
    let curr, last;

    // 遍历排序后的箭矢数组，从第二个箭矢开始
    for (let i = 1; i < points.length; i++) {
        // 当前箭矢的位置
        curr = points[i];
        // 上一个存储在结果数组中的箭矢位置
        last = resArr[resArr.length - 1];

        // 如果当前箭矢的位置大于上一个箭矢的飞行距离，
        // 说明它可以射击到新的区域，因此将其加入结果数组
        if (curr[0] > last[1]) {
            resArr.push(curr);
            // 增加箭矢数量计数器
            cnt++;
        }
    }

    // 返回需要的最小箭矢数量
    return cnt;
};

console.log(findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]])); // 输出：2