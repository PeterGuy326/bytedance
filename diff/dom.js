/**
 * 在JavaScript中，实现一个简单的DOM diff算法通常涉及以下步骤：
    将新旧DOM树转换为虚拟DOM节点。
    比较新旧虚拟DOM节点的差异。
    根据差异计算出需要执行的DOM操作（添加、删除、更新）。
    执行计算出的DOM操作，更新真实的DOM树。
    以下是一个简化版的DOM diff算法的实现示例，它只处理了同层级的文本节点的比较和更新
 * @param {*} element 
 * @returns 
 */
function createNode(element) {
    if (typeof element === 'string') {
        return document.createTextNode(element);
    } else {
        const node = document.createElement(element.tagName);
        for (const attr in element.attributes) {
            node.setAttribute(attr, element.attributes[attr]);
        }
        for (const child of element.children) {
            node.appendChild(createNode(child));
        }
        return node;
    }
}

function diff(oldNode, newNode) {
    if (typeof oldNode === 'string' && typeof newNode === 'string') {
        if (oldNode !== newNode) {
            oldNode.nodeValue = newNode;
        }
    } else if (oldNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
        if (oldNode.tagName !== newNode.tagName) {
            replaceNode(oldNode, createNode(newNode));
        } else {
            const attributes = newNode.attributes;
            for (let i = 0; i < attributes.length; i++) {
                const attr = attributes[i];
                if (oldNode.hasAttribute(attr.name)) {
                    if (oldNode.getAttribute(attr.name) !== attr.value) {
                        oldNode.setAttribute(attr.name, attr.value);
                    }
                } else {
                    oldNode.setAttribute(attr.name, attr.value);
                }
            }
            diff(oldNode.children, newNode.children);
        }
    } else {
        replaceNode(oldNode, createNode(newNode));
    }
}

function replaceNode(oldNode, newNode) {
    const parent = oldNode.parentNode;
    parent.replaceChild(newNode, oldNode);
}

// 示例使用
const oldVirtualNode = {
    tagName: 'div',
    children: [
        { tagName: 'span', children: ['Hello'] },
        { tagName: 'span', children: ['World'] }
    ]
};

const newVirtualNode = {
    tagName: 'div',
    children: [
        { tagName: 'span', children: ['Hello'] },
        { tagName: 'span', children: ['React'] }
    ]
};

diff(document.createElement('div'), oldVirtualNode, newVirtualNode);