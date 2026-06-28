
  
<div align="center">

# AI Chat

Free Multi-Model AI Chat Tool

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=font-awesome&logoColor=white)](https://fontawesome.com/)
[![Marked.js](https://img.shields.io/badge/Marked.js-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://marked.js.org/)

[English](README.md) | **简体中文** | [繁体中文](README.zh.tw.md)

<p>
  <a href="https://github.com/TACS-Studio/tacs-studio.github.io/stargazers"><img src="https://img.shields.io/github/stars/TACS-Studio/tacs-studio.github.io?style=for-the-badge&logo=github&color=f4c542" alt="Stars"></a>
  <a href="https://github.com/TACS-Studio/tacs-studio.github.io/network/members"><img src="https://img.shields.io/github/forks/TACS-Studio/tacs-studio.github.io?style=for-the-badge&logo=github&color=6cc644" alt="Forks"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"></a>
</p>

</div>

## 简介

AI Chat 是由 **TACS Studio** 开发的免费在线 AI 对话工具，支持 Spark、GLM、Quark 三大语言模型，具备自定义 AI 人设、深色模式、Markdown 渲染等功能，完美适配手机和电脑。

> [!tip]
> 目前终端版本已基本定型，网页版还在调试修改中。有建议可以提 Issues

## 功能特性

- 🤖 **多模型支持**: Spark、GLM、Quark 大型语言模型
- 🌐 **多语言界面**: 英文、简体中文、繁体中文
- 🎭 **自定义人设**: 设置全局 AI 系统角色
- 🌙 **深色模式**: 明暗主题切换
- 📝 **Markdown 渲染**: 代码高亮、表格、列表等
- 📱 **响应式设计**: 全设备适配

## 访问地址

| 语言 | 链接 |
|------|------|
| English | https://tacs-studio.github.io/index.html |
| 简体中文 | https://tacs-studio.github.io/zh.cn.html |
| 繁体中文 | https://tacs-studio.github.io/zh.tw.html |
| 极简版 | https://tacs-studio.github.io/web/chat.html |
| 绘图工具 | https://tacs-studio.github.io/web/draw.html |

## 支持的模型

- **GLM**: 智谱 AI 大模型
- **Spark**: 讯飞星火大模型
- **Quark**: 夸克大模型
- **Draw**: AI 绘图大模型
- **More**: 还有更多等待添加

## 技术栈

- **前端**: HTML5 + CSS3 + JavaScript
- **图标**: Font Awesome 6.4.0
- **Markdown**: marked.js
- **API**: 自定义后端接口

## 多语言客户端

项目提供多种编程语言的客户端实现，存放在 `ai/` 目录：

| 语言 | 文件 | 用途 |
|------|------|------|
| Python | `ai.py` | 命令行客户端 |
| Node.js | `ai.js` | 交互式终端 |
| PHP | `ai.php` | Web / CLI 双模式 |
| Java | `ai.java` | Java 命令行 |
| C | `ai.c` | C 语言客户端 |
| Shell | `ai.sh` | Shell 脚本 |
| HTML | `ai.html` | 独立网页 |

所有终端语言都可以使用 `运行方式 你的问题` 这种方式提问，例如：

```bash
python ai.py 你好
php ai.php 你是谁
 
 
[!note]
注意：NodeJS 版本为持续对话模式，推荐使用
 
快速开始
 
bash
  
# 克隆项目
git clone https://github.com/TACS-Studio/tacs-studio.github.io.git

# 进入目录
cd tacs-studio.github.io

# 启动本地服务器
python -m http.server 8000
# 或者使用 serve
npx serve

# 访问 http://localhost:8000
 
 
项目结构
 
plaintext
  
tacs-studio.github.io/
├── index.html      # 英文版主页
├── zh.cn.html      # 简体中文页面
├── zh.tw.html      # 繁体中文页面
├── script.js       # 主页脚本
├── style.css       # 样式文件
├── ai/             # 多语言客户端目录
│   ├── ai.py
│   ├── ai.js
│   ├── ai.php
│   ├── ai.java
│   ├── ai.c
│   ├── ai.sh
│   ├── ai.html
│   └── README.md
├── favicon.ico     # 网站图标
└── LICENSE         # MIT 许可证
 
 
使用注意
 
1. AI 生成内容仅供参考，请结合自身独立判断
2. 请勿输入敏感个人信息或隐私数据
3. 不同模型能力各异，请根据场景切换使用
4. 项目还在测试开发中，如有 Bug 请反馈
 
许可证
 
本项目根据 MIT License 发行，软件原样提供。详情查看 LICENSE
 
(测试时发现部分 AI 时间观念不准确，可以在人设里定义时间)

如果不喜欢，请不要伤害。如果喜欢，欢迎点 Star！
 
plaintext
 