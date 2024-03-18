function isCompleteBinaryTree(root) {
    if (!root) return true; // 空树视为完全二叉树

    const queue = [root];
    let flag = false; // 标记是否出现了节点不全为 null 的情况

    while (queue.length > 0) {
        const node = queue.shift();

        if (node === null) {
            flag = true; // 标记出现了节点为 null 的情况
        } else {
            // 如果已经出现过节点为 null 的情况，但当前节点不为 null，则不是完全二叉树
            if (flag) return false;

            // 将非空节点的左右子节点加入队列
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    return true;
}
