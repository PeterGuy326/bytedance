/**
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，
 * 并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
 * 
 * 一般来说，删除节点可分为两个步骤：
 *  1. 首先找到需要删除的节点；
 *  2. 如果找到了，删除它。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @desc 迭代
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode_1 = function (root, key) {
    if (!root) { // root 为空，代表未搜索到值为 key\textit{key}key 的节点，返回空。
        return null;
    }
    if (root.val > key) { // 标识值为 key 的节点可能存在于 root 的左子树中，需要递归地在 root.left 调用 deleteNode，并返回 root
        root.left = deleteNode_1(root.left, key);
        return root;
    }
    if (root.val < key) { // 标识值为 key 的节点可能存在于 root 的右子树中，需要递归地在 root.right 调用 deleteNode，并返回 root
        root.right = deleteNode_1(root.right, key);
        return root;
    }
    if (root.val === key) { // root 即为要删除的节点。此时要做的是删除 root，并将它的子树合并成一棵子树，保持有序性，并返回根节点
        if (!root.left && !root.right) { // root 为椰子节点，没有子树。此时可以直接将它删除，即返回空
            return null;
        }
        if (!root.right) { // 只有左子树，没有右子树。此时可以将它的左子树作为新的子树，返回它的左子节点
            return root.left;
        }
        if (!root.left) { // 只有右子树，没有左子树。此时可以将它的右子树作为新的子树，返回它的右子节点
            return root.right;
        }

        // 如果要删除的节点有两个子节点，这时需要找到该节点的右子树中的最小节点（即右子树中最左边的节点，也称为后继
        // 节点），这个后继节点的值将替代被删除节点的值。为了保持二叉搜索树的性质，后继节点的右子节点将成为新的后继
        // 节点的左子节点，后继节点的左子节点将成为被删除节点的左子节点。
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;
        }
        root.right = deleteNode_1(root.right, successor.val);
        successor.right = root.right;
        successor.left = root.left;
        return successor;
    }
    return root;
};

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
    if (root == null) return null;
    if (root.val === key) {
        if (root.left == null && root.right == null) return null;
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        if (root.left != null && root.right != null) {
            let target = getMinTreeMaxNode(root.left);
            root.val = target.val;
            root.left = deleteNode(root.left, target.val);
        }
    }
    if (root.val < key) {
        root.right = deleteNode(root.right, key);
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    }
    return root;
};
function getMinTreeMaxNode(root) {
    if (root.right == null) return root;
    return getMinTreeMaxNode(root.right);
}
