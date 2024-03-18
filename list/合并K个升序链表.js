/**
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
    输出：[1,1,2,3,4,4,5,6]
    解释：链表数组如下：
    [
        1->4->5,
        1->3->4,
        2->6
    ]
    将它们合并到一个有序链表中得到。
    1->1->2->3->4->4->5->6
 */

/**
 * 实现思路：
 * 1. 创建一个最小堆（或优先队列），用于高效地找到所有链表中的最小节点。
 * 2. 遍历输入的链表数组，将每个链表的头节点加入到最小堆中。
 * 3. 创建一个虚拟头节点和一个当前节点指针 current，用于构建合并后的链表。
 * 4. 当最小堆不为空时，执行以下操作：
 *   a. 从堆中提取最小节点，并将其添加到合并后的链表中。
 *   b. 如果提取的链表还有后续节点，将这些节点加入到最小堆中。
 * 5. 重复步骤 4，直到最小堆为空。
 * 6. 返回合并后的链表（从虚拟头节点的下一个节点开始）。
 * 
 * 总结：这种方法的时间复杂度是 O(Nlogk)，其中 N 是所有链表中元素的总数，
 *      k 是链表的数量。这是因为每个链表的每个节点都会被加入到最小堆中一次，
 *      并且每次从堆中提取最小节点的时间复杂度是 O(logk)。
 */
// 定义链表节点
function ListNode(val, next) {
    this.val = val;
    this.next = next;
}

// 合并链表的函数
function mergeKLists(lists) {
    // 使用优先队列（最小堆）来高效地提取最小值节点
}

// 最小堆类，用于高效地找到最小值
class MinHeap {
    constructor() {
        this.heap = []
    }

    // 向堆中添加元素
    push({ val, list }) {
        this.heap.push({ val, list })
        this.heapifyUp()
    }

    // 移除并返回堆顶元素
    pop() {
        const [minVal, minList] = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.ength > 0) {
            l
            this.heap[0] = end;
            this.heapifyDown();
        }
        return { val: minVal, list: minList };
    }

    // 维护堆的性质向上调整
    heapifyUp = () => {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = (index - 1) >> 1;
            if (this.heap[parentIndex].val >= this.heap[index].val) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    };

    // 维护堆的性质向下调整
    heapifyDown = () => {
        let index = 0;
        while (true) {
            const leftChildIndex = (index << 1) + 1;
            const rightChildIndex = leftChildIndex + 1;
            let smallest = index;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].val < this.heap[smallest].val) {
                smallest = leftChildIndex;
            }

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].val < this.heap[smallest].val) {
                smallest = rightChildIndex;
            }

            if (index === smallest) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    };

    // 获取堆的大小
    size() {
        return this.heap.length;
    }
}

// 合并链表
let mergedList = mergeKLists([list1, list2, list3]);

// 打印合并后的链表
let node = mergedList;
while (node) {
    console.log(node.val);
    node = node.next;
}