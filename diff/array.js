function arrayDiff(arr1, arr2) {
    const diff = {
        added: [],
        removed: [],
        unchanged: []
    };

    arr1.forEach(item => {
        const index = arr2.indexOf(item);
        if (index === -1) {
            diff.removed.push(item);
        } else {
            arr2.splice(index, 1); // 移除已匹配的元素
            diff.unchanged.push(item);
        }
    });

    arr2.forEach(item => {
        diff.added.push(item);
    });

    return diff;
}

// 示例使用
const array1 = [1, 2, 3, 4, 5];
const array2 = [1, 3, 5, 7, 9];

const result = arrayDiff(array1, array2);
console.log(result);