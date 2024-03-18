const axios = require('axios');
const cheerio = require('cheerio');

// 目标网页的 URL
const url = 'http://example.com'; // 请替换为你想要抓取的网页地址

// 异步函数来发送 HTTP 请求并处理响应
async function fetchAndScrape(url) {
    try {
        // 发送 GET 请求到目标网页
        const response = await axios.get(url);

        // 使用 cheerio 加载 HTML 响应体
        const $ = cheerio.load(response.data);

        // 提取网页标题
        const title = $('title').text();
        console.log('网页标题:', title);

        // 提取并输出所有链接
        const links = $('a').map((i, link) => $(link).attr('href')).get();
        console.log('链接列表:', links);
    } catch (error) {
        // 处理网络错误
        console.error('请求网页时出错:', error);
    }
}

// 调用函数并传入目标 URL
fetchAndScrape(url);