(function () {
    'use strict';

    // ============================================
    // 工具函数
    // ============================================
    
    // HTML 转义，防止 XSS 注入
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // 滚动到底部
    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    // 本地存储封装
    const storage = {
        get(key, defaultValue = '') {
            try {
                return localStorage.getItem(key) || defaultValue;
            } catch (e) {
                return defaultValue;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                console.warn('本地存储写入失败:', e);
            }
        },
        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {}
        }
    };

    // ============================================
    // DOM 元素统一缓存
    // ============================================
    const dom = {
        body: document.body,
        chat: document.getElementById('chat'),
        input: document.getElementById('input'),
        send: document.getElementById('send'),
        menuBtn: document.getElementById('menuBtn'),
        drop: document.getElementById('drop'),
        darkToggle: document.getElementById('darkToggle'),
        setRoleBtn: document.getElementById('setRoleBtn'),
        langOpen: document.getElementById('langOpen'),
        modelOpen: document.getElementById('modelOpen'),
        notesOpen: document.getElementById('notesOpen'),
        list1: document.getElementById('List1'),
        list2: document.getElementById('List2'),
        list3: document.getElementById('List3'),
        modelItems: document.querySelectorAll('.item[data-key]')
    };

    // ============================================
    // 全局状态
    // ============================================
    const state = {
        currentKey: storage.get('modelKey', 'glm'),
        isRequesting: false, // 请求锁，防止重复提交
        typeTimer: null      // 打字机定时器
    };

    // ============================================
    // 模型切换逻辑
    // ============================================
    function setActiveModel() {
        dom.modelItems.forEach(el => {
            const isActive = el.dataset.key === state.currentKey;
            el.classList.toggle('active', isActive);
            el.setAttribute('aria-checked', isActive);
        });
    }

    function initModelSwitch() {
        if (!dom.modelOpen || !dom.list2) return;

        // 模型菜单展开/收起
        dom.modelOpen.addEventListener('click', () => {
            dom.list2.classList.toggle('open');
        });

        // 模型选择
        dom.modelItems.forEach(el => {
            el.addEventListener('click', () => {
                state.currentKey = el.dataset.key;
                storage.set('modelKey', state.currentKey);
                setActiveModel();
                dom.list2.classList.remove('open');
            });
        });

        setActiveModel();
    }

    // ============================================
    // 下拉菜单通用逻辑
    // ============================================
    function initDropdown(trigger, panel) {
        if (!trigger || !panel) return;
        trigger.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }

    function closeAllPanels() {
        dom.drop.classList.remove('show');
        [dom.list1, dom.list2, dom.list3].forEach(panel => {
            if (panel) panel.classList.remove('open');
        });
    }

    // ============================================
    // 侧边菜单逻辑
    // ============================================
    function initMenu() {
        if (!dom.menuBtn || !dom.drop) return;

        // 菜单开关
        dom.menuBtn.addEventListener('click', e => {
            e.stopPropagation();
            dom.drop.classList.toggle('show');
        });

        // 点击外部关闭所有面板
        document.addEventListener('click', e => {
            if (!dom.drop.contains(e.target) && !dom.menuBtn.contains(e.target)) {
                closeAllPanels();
            }
        });
    }

    // ============================================
    // 夜间模式逻辑
    // ============================================
    function initDarkMode() {
        if (!dom.darkToggle) return;

        // 初始化主题
        if (storage.get('darkMode') === 'on') {
            dom.body.classList.add('dark');
        }

        // 切换主题
        dom.darkToggle.addEventListener('click', () => {
            const isDark = dom.body.classList.toggle('dark');
            storage.set('darkMode', isDark ? 'on' : 'off');
        });
    }

    // ============================================
    // 自定义人设逻辑
    // ============================================
    function initRoleSetting() {
        if (!dom.setRoleBtn) return;

        dom.setRoleBtn.addEventListener('click', () => {
            const dataset = dom.body.dataset;
            const oldRole = storage.get('customSystemRole');
            const rolePrompt = dataset.rolePrompt || '输入自定义AI全局人设（清空保存即可恢复自由对话）：';
            const roleCleared = dataset.roleCleared || '已清空全局人设，恢复自由全能对话';
            const roleSaved = dataset.roleSaved || '自定义人设已保存，后续对话自动生效';

            const newRole = prompt(rolePrompt, oldRole);
            if (newRole === null) return;

            const trimRole = newRole.trim();
            if (trimRole === '') {
                storage.remove('customSystemRole');
                alert(roleCleared);
            } else {
                storage.set('customSystemRole', trimRole);
                alert(roleSaved);
            }

            closeAllPanels();
        });
    }

    // ============================================
    // 聊天核心逻辑
    // ============================================
    function initChat() {
        if (!dom.chat || !dom.input || !dom.send) return;

        const dataset = dom.body.dataset;
        const thinkText = dataset.think || '正在思考...';
        const errorText = dataset.error || '出现错误，请稍后重试。';
        const aiTipText = dataset.tip || 'AI生成内容仅供参考。';

        // 发送消息主函数
        async function sendMsg() {
            const text = dom.input.value.trim();
            if (!text || state.isRequesting) return;

            // 上锁，防止重复提交
            state.isRequesting = true;
            dom.send.disabled = true;

            // 清空输入框
            dom.input.value = '';

            // 插入用户消息（转义后再插入，防 XSS）
            const userMsg = document.createElement('div');
            userMsg.className = 'msg user';
            userMsg.textContent = text;
            dom.chat.appendChild(userMsg);

            // 插入思考中状态
            const thinkBox = document.createElement('div');
            thinkBox.className = 'msg think';
            thinkBox.textContent = thinkText;
            dom.chat.appendChild(thinkBox);

            scrollToBottom();

            // 清除上一次可能还在运行的打字机
            if (state.typeTimer) {
                clearInterval(state.typeTimer);
                state.typeTimer = null;
            }

            // 构造请求参数
            const systemRole = storage.get('customSystemRole');
            const prompt = systemRole ? `${systemRole} ${text}` : text;
            const apiUrl = `https://api.52vmy.cn/api/chat/${state.currentKey}?msg=${encodeURIComponent(prompt)}`;

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                const reply = data?.data?.answer || errorText;

                // 移除思考框
                thinkBox.remove();

                // 创建 AI 回复容器
                const aiBox = document.createElement('div');
                aiBox.className = 'msg ai';
                aiBox.innerHTML = `<div class="tip">${escapeHtml(aiTipText)}</div>`;
                dom.chat.appendChild(aiBox);

                // 打字机效果渲染
                let fullText = '';
                let index = 0;
                state.typeTimer = setInterval(() => {
                    if (index < reply.length) {
                        fullText += reply[index];
                        // 仅正文部分用 marked 渲染，提示栏保持不变
                        aiBox.innerHTML = `<div class="tip">${escapeHtml(aiTipText)}</div>` + marked.parse(fullText);
                        scrollToBottom();
                        index++;
                    } else {
                        clearInterval(state.typeTimer);
                        state.typeTimer = null;
                    }
                }, 10);

            } catch (err) {
                console.error('请求失败:', err);
                thinkBox.remove();

                const errorBox = document.createElement('div');
                errorBox.className = 'msg ai';
                errorBox.innerHTML = `
                    <div class="tip">${escapeHtml(aiTipText)}</div>
                    ${escapeHtml(errorText)}
                `;
                dom.chat.appendChild(errorBox);
                scrollToBottom();
            } finally {
                // 解锁
                state.isRequesting = false;
                dom.send.disabled = false;
                dom.input.focus();
            }
        }

        // 按钮点击发送
        dom.send.addEventListener('click', sendMsg);

        // 回车发送，Shift+回车换行
        dom.input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMsg();
            }
        });
    }

    // ============================================
    // 统一初始化
    // ============================================
    function init() {
        initDropdown(dom.langOpen, dom.list1);
         initDropdown(dom.notesOpen, dom.list3);
         initModelSwitch();
         initMenu();
         initDarkMode();
         initRoleSetting();
         initChat();
     }
     // DOM 加载完成后执行
     if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', init);
     } else {
         init();
     }
 })();