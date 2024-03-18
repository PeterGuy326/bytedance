// 假设有一个数组 [3, 1, 5, 7, 2, 4]，要找出前 3 个最大的元素。

// 一种解决方案是使用最小堆（Min Heap）来解决。
// 首先构建一个大小为 K 的最小堆，然后遍历数组，将数组中的元素逐个插入堆中，
// 并保持堆的大小为 K。当堆的大小超过 K 时，移除堆顶元素（最小元素）。
// 这样，当遍历完数组后，堆中剩下的元素即为前 K 个最大的元素。

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return top;
    }

    heapifyUp(index) {
        let currIndex = index;
        while (currIndex > 0) {
            const parentIndex = Math.floor((currIndex - 1) / 2);
            if (this.heap[parentIndex] > this.heap[currIndex]) {
                [this.heap[parentIndex], this.heap[currIndex]] = [this.heap[currIndex], this.heap[parentIndex]];
                currIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        let currIndex = index;
        while (true) {
            let leftChildIndex = currIndex * 2 + 1;
            let rightChildIndex = currIndex * 2 + 2;
            let smallestChildIndex = currIndex;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex !== currIndex) {
                [this.heap[currIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currIndex]];
                currIndex = smallestChildIndex;
            } else {
                break;
            }
        }
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}

function findTopK(arr, k) {
    const minHeap = new MinHeap();

    // 先将数组中的前 k 个元素加入最小堆
    for (let i = 0; i < k; i++) {
        minHeap.push(arr[i]);
    }

    // 遍历数组中剩下的元素
    for (let i = k; i < arr.length; i++) {
        // 如果数组中的元素比堆顶元素大，则替换堆顶元素，并重新调整堆
        if (arr[i] > minHeap.peek()) {
            minHeap.pop();
            minHeap.push(arr[i]);
        }
    }

    // 最终堆中剩下的元素即为前 k 个最大的元素
    const result = [];
    while (minHeap.size() > 0) {
        result.unshift(minHeap.pop());
    }
    return result;
}

// 示例
const arr = [3, 1, 5, 7, 2, 4];
const k = 3;
console.log(`前 ${k} 个最大的元素为：`, findTopK(arr, k)); // 输出 [5, 7, 4]
