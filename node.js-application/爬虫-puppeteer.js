const puppeteer = require('puppeteer');

(async () => {
    // 启动浏览器实例
    const browser = await puppeteer.launch();

    // 打开新页面
    const page = await browser.newPage();

    // 导航到目标网页
    const url = 'http://example.com'; // 请替换为你想要抓取的网页地址
    await page.goto(url, { waitUntil: 'networkidle2' });

    // 获取网页标题
    const title = await page.title();
    console.log('网页标题:', title);

    // 获取网页内容
    const content = await page.content();
    const $ = require('cheerio').load(content);

    // 提取并输出所有链接
    const links = $('a').map((i, link) => $(link).attr('href')).get();
    console.log('链接列表:', links);

    // 关闭浏览器
    await browser.close();
})();