#!/usr/bin/env node
// -*- coding: utf-8 -*-
/**
 * TACS AI Chat Node.js Terminal Client
 * Interactive chat with typing animation, support CLI argument direct question
 */
const readline = require('readline');
const fetchPromise = import('node-fetch');

// ANSI 颜色常量
const COLOR = Object.freeze({
    YELLOW: '\033[33m',
    RED: '\033[31m',
    RESET: '\033[0m'
});
const { YELLOW, RED, RESET } = COLOR;

/**
 * 打字机输出动画
 * @param {string} text 完整文本
 * @param {number} delay 每字间隔毫秒
 * @returns {Promise<void>}
 */
async function typeWrite(text, delay = 15) {
    return new Promise((resolve) => {
        let index = 0;
        process.stdout.write(`\r${YELLOW}AI> ${RESET}`);
        const timer = setInterval(() => {
            if (index < text.length) {
                process.stdout.write(text.charAt(index));
                index++;
            } else {
                clearInterval(timer);
                process.stdout.write(`\n\n`);
                resolve();
            }
        }, delay);
    });
}

/**
 * 发送提问请求API
 * @param {string} msg 用户提问
 * @param {number} timeout 超时毫秒
 * @returns {Promise<string>}
 */
async function sendMessage(msg, timeout = 10000) {
    process.stdout.write(`\r${YELLOW}AI> ${RESET}正在思考中...`);
    const { default: fetch } = await fetchPromise;

    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeout);

    try {
        const url = `https://api.52vmy.cn/api/chat/glm?msg=${encodeURIComponent(msg)}`;
        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'TACS-AIChat-Node/1.0'
            }
        });
        clearTimeout(timerId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rawMd = data.data?.answer ?? '抱歉，由于限制，请稍后再试';
        await typeWrite(rawMd);
    } catch (err) {
        clearTimeout(timerId);
        let errMsg = '网络或接口出错，请重试';
        if (err.name === 'AbortError') errMsg = '请求超时，请检查网络';
        process.stdout.write(`\r${RED}AI> ${RESET}${errMsg}\n\n`);
    }
}

// 初始化终端交互
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${YELLOW}你> ${RESET}`
});
rl.pause();

// 读取命令行初始参数
const cliArgs = process.argv.slice(2);
const initQuestion = cliArgs.length > 0 ? cliArgs.join(' ') : null;

// 欢迎提示
console.log('======= \033[33mAI Chat Tool\033[0m =======');
console.log('[*]Enter message to chat, type exit to quit');
console.log('[*]输入消息对话，输入 exit 退出\n');
rl.resume();

// 输入行监听
rl.on('line', async (inputRaw) => {
    const content = inputRaw.trim();
    rl.pause();

    if (content.toLowerCase() === 'exit') {
        rl.close();
        return;
    }
    if (content) {
        await sendMessage(content);
    }

    rl.resume();
    rl.prompt();
}).on('close', () => {
    console.log('Dialogue Ended / 对话结束');
    process.exit(0);
});

// 入口执行
(async function run() {
    if (initQuestion) {
        await sendMessage(initQuestion);
    }
    rl.prompt();
})();
