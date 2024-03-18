/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const exists = (root, level, k) => {
    let bits = 1 << (level - 1);
    let node = root;
    while (node !== null && bits > 0) {
        if (!(bits & k)) {
            node = node.left;
        } else {
            node = node.right;
        }
        bits >>= 1;
    }
    return node !== null;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes_1 = function (root) {
    if (root === null) {
        return 0;
    }
    let level = 0;
    let node = root;
    while (node.left !== null) {
        level++;
        node = node.left;
    }
    let low = 1 << level, high = (1 << (level + 1)) - 1;
    while (low < high) {
        const mid = Math.floor((high - low + 1) / 2) + low;
        if (exists(root, level, mid)) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    return low;
};

// 对于任意二叉树，都可以通过广度优先搜索或深度优先搜索计算节点个数，时间复杂度和空间复杂度都是O(n)

/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    if (root == null) return 0;
    let l = root, r = root;
    let lh = 0, rh = 0;
    while (l != null) {
      l = l.left;
      lh++;
    }
    while (r != null) {
      r = r.right;
      rh++;
    }
    if (lh === rh) {
      return Math.pow(2, lh) - 1;
    }
    return 1 + countNodes(root.left) + countNodes(root.right);
};
