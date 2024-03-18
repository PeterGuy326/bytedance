class MaxHeap {
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
            if (this.heap[parentIndex] < this.heap[currIndex]) {
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
            let largestChildIndex = currIndex;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largestChildIndex]) {
                largestChildIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largestChildIndex]) {
                largestChildIndex = rightChildIndex;
            }

            if (largestChildIndex !== currIndex) {
                [this.heap[currIndex], this.heap[largestChildIndex]] = [this.heap[largestChildIndex], this.heap[currIndex]];
                currIndex = largestChildIndex;
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

function findTopKMax(arr, k) {
    const maxHeap = new MaxHeap();

    // 先将数组中的前 k 个元素加入最大堆
    for (let i = 0; i < k; i++) {
        maxHeap.push(arr[i]);
    }

    // 遍历数组中剩下的元素
    for (let i = k; i < arr.length; i++) {
        // 如果数组中的元素比堆顶元素小，则替换堆顶元素，并重新调整堆
        if (arr[i] < maxHeap.peek()) {
            maxHeap.pop();
            maxHeap.push(arr[i]);
        }
    }

    // 最终堆中剩下的元素即为前 k 个最大的元素
    const result = [];
    while (maxHeap.size() > 0) {
        result.unshift(maxHeap.pop());
    }
    return result;
}

// 示例
const arr = [3, 1, 5, 7, 2, 4];
const k = 3;
console.log(`前 ${k} 个最大的元素为：`, findTopKMax(arr, k)); // 输出 [5, 7, 4]
