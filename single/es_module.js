// Singleton.js
export default class Singleton {
    // 私有构造函数
    constructor() {
        if (Singleton.instance) {
            throw new Error('Singleton already initialized!');
        }
        Singleton.instance = this;
    }

    // 公开的获取实例的方法
    static getInstance() {
        return Singleton.instance;
    }
}

// 应用其他文件
import Singleton from './Singleton.js';
const singleton = Singleton.getInstance();