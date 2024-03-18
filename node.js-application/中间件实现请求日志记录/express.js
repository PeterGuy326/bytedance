const fs = require('fs');
const path = require('path');

/**
 * 请求日志中间件
 * @param {Object} [options] - 自定义日志记录的配置选项
 * @param {string} [options.format] - 日志记录的格式
 * @param {boolean} [optionsToFile] - 是否将日志写入文件
 * @returns {function} - Express 中间件
 */
function requestLogger(options = {}) {
    const { format = '[:method] :url :status - :response-time ms', toFile = false } = options;
    const logStream = toFile ? fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) : process.stdout;

    return (req, res, next) => {
        const start = new Date();

        // 定义日志记录函数
        const logRequest = () => {
            const method = req.method;
            const url = req.originalUrl || req.url;
            const status = res.statusCode;
            const time = new Date() - start;
            const logMessage = format
                .replace(':method', method)
                .replace(':url', url)
                .replace(':status', status)
                .replace(':response-time', time.toFixed(2));

            // 写入日志
            logStream.write(`${logMessage}\n`);
        };

        // 监听响应结束事件以记录日志
        res.on('finish', logRequest);

        // 继续下一个中间件
        next();
    };
}

module.exports = requestLogger;