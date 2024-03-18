function addTwoBigNumbers(num1, num2) {
    // 确保两个数的长度相同，如果不同，补零使长度相等
    const maxLength = Math.max(num1.length, num2.length);
    num1 = num1.padStart(maxLength, '0');
    num2 = num2.padStart(maxLength, '0');

    let carry = 0; // 进位
    let result = ''; // 结果字符串

    // 从字符串的最后一位开始逐位相加
    for (let i = maxLength - 1; i >= 0; i--) {
        const digitSum = parseInt(num1[i]) + parseInt(num2[i]) + carry;
        const digit = digitSum % 10;
        carry = Math.floor(digitSum / 10);
        result = digit.toString() + result;
    }

    // 如果最高位的计算结果大于等于 10，需要在结果字符串的最前面添加一个进位的 1
    if (carry > 0) {
        result = '1' + result;
    }

    return result;
}

// 示例
const num1 = '12345678901234567890';
const num2 = '98765432109876543210';
console.log(addTwoBigNumbers(num1, num2));
