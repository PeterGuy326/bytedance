const fs = require('fs');

const fs = require('fs');

// 定义一个异步函数来读取文件并计算单词数量
function countWordsInFile(filePath) {
    fs.promises.readFile(filePath, 'utf8')
        .then(data => {
            // 使用正则表达式匹配单词
            const words = data.match(/\b[\w']+\b/g) || [];
            // 输出单词数量
            console.log(`文件中的单词数量: ${words.length}`);
        })
        .catch(error => {
            // 处理可能出现的错误
            console.error(`读取文件时出错: ${error}`);
        });
}

// 这是同步函数来读取文件并计算单词数量
async function countWordsInFileSync(filePath) {
    try {
        // 异步读取文件内容
        const data = await fs.promises.readFile(filePath, 'utf8');

        // 使用正则表达式匹配单词（简单的按空格和标点分割）
        const words = data.match(/\b[\w']+\b/g); // 这里用正则表达可以替换

        // 如果没有匹配到单词，返回0
        if (!words) {
            return 0;
        }

        // 输出单词数量
        console.log(`文件中的单词数量: ${words.length}`);
    } catch (error) {
        // 处理可能出现的错误
        console.error(`读取文件时出错: ${error}`);
    }
}

// 指定文件路径
const filePath = 'data.txt';

// 调用函数并传入文件路径
countWordsInFile(filePath);

// 调用函数并传入文件路径
countWordsInFileSync(filePath);