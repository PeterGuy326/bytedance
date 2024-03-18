// 冒泡排序（Bubble Sort）
// 通过重复遍历数组，比较相邻元素并交换位置，使得较大元素逐渐移动到数组末尾，就像气泡从水底升到水面一样。
// 时间复杂度：O(n^2)（最坏和平均情况），O(n)（最佳情况，已排序）。 空间复杂度：O(1)。
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// 选择排序（Selection Sort）
// 在数组中找到最小（或最大）元素，将其与数组第一个元素交换，然后从剩余元素中找到最小（或最大）元素，与数组第二个元素交换，依此类推。
// 时间复杂度：O(n^2)。 空间复杂度：O(1)。
function selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

// 插入排序（Insertion Sort）
// 构建有序序列，对未排序的部分进行扫描，将当前元素插入到有序序列的适当位置。
// 时间复杂度：O(n^2)（最坏和平均情况），O(n)（最佳情况，已排序） 空间复杂度：O(1)。
function insertionSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let preIndex = i - 1;
        let current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

// 归并排序（Merge Sort）
// 递归地将数组分成两半，然后合并已排序的子数组。合并时，比较两个子数组的元素，将较小的元素放入新的数组中。
// 时间复杂度：O(n log n)。 空间复杂度：O(n)（需要额外空间来存储合并后的数组）。
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}

// 快速排序（Quick Sort）
// 选择一个基准元素，将数组分为两部分，一部分包含小于基准的元素，另一部分包含大于基准的元素。然后递归地对这两部分进行快速排序。
// 时间复杂度：O(n log n)（平均情况），O(n^2)（最坏情况，如已排序或所有元素相等）。 空间复杂度：O(log n)（递归栈的深度）。
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[0];
    let left = [];
    let right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

// 堆排序（Heap Sort）
// 将数组构建成一个最大堆或最小堆，然后将堆顶元素与最后一个元素交换，并从堆中移除最后一个元素，重新调整堆的结构，重复这个过程直到堆的大小为1。
// 时间复杂度：O(n log n)。 空间复杂度：O(1)。
function heapSort(arr) {
    let buildMaxHeap = (arr) => {
        let len = arr.length;
        for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
            heapify(arr, len, i);
        }
    };

    let heapify = (arr, len, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < len && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < len && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, len, largest);
        }
    };

    buildMaxHeap(arr);
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}

// 希尔排序（Shell Sort）
// 基于插入排序的一种改进算法，通过使用不同的间隔序列来比较和交换元素，然后逐渐减少间隔，最后使用间隔为1的插入排序完成排序。
// 时间复杂度：O(n log^2 n)（某些特定间隔序列），O(n^2)（最坏情况）。 空间复杂度：O(1)。
function shellSort(arr) {
    let len = arr.length;
    let gap = Math.floor(len / 2);
    while (gap > 0) {
        for (let i = gap; i < len; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}

// 计数排序（Counting Sort）
// 统计每个元素在数组中出现的次数，然后根据元素的值来计算其在排序后数组中的位置。
// 时间复杂度：O(n + k)，其中 k 是数组中的最大值和最小值之间的差。 空间复杂度：O(k)（需要额外空间来存储计数数组）。
function countingSort(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    let index = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min;
            count[i]--;
        }
    }
    return arr;
}

// 二分查找 时间复杂度 O(log n)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // 计算中间索引
        let mid = Math.floor((left + right) / 2);
        // 获取中间元素
        let midValue = arr[mid];

        if (midValue === target) {
            // 找到目标元素，返回索引
            return mid;
        } else if (midValue < target) {
            // 如果中间值小于目标值，搜索右侧子数组
            left = mid + 1;
        } else {
            // 如果中间值大于目标值，搜索左侧子数组
            right = mid - 1;
        }
    }

    // 如果没有找到目标元素，返回 -1
    return -1;
}

// 示例数组（已排序）
let sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
// 要查找的目标值
let targetValue = 9;

// 执行二分查找
let index = binarySearch(sortedArray, targetValue);

if (index !== -1) {
    console.log(`元素 ${targetValue} 找到，位于索引 ${index}`);
} else {
    console.log(`元素 ${targetValue} 不存在于数组中`);
}