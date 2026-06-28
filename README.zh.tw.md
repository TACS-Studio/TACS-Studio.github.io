<div align="center">

# AI Chat (克隆來自bill74186的開源項目)

Free Multi-Model AI Chat Tool

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=font-awesome&logoColor=white)](https://fontawesome.com/)
[![Marked.js](https://img.shields.io/badge/Marked.js-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://marked.js.org/)

[English](README.md) | [簡體中文](README.zh.cn.md) | **繁體中文**

<p>
  <a href="https://github.com/TACS-Studio/tacs-studio.github.io/stargazers"><img src="https://img.shields.io/github/stars/TACS-Studio/tacs-studio.github.io?style=for-the-badge&logo=github&color=f4c542" alt="Stars"></a>
  <a href="https://github.com/TACS-Studio/tacs-studio.github.io/network/members"><img src="https://img.shields.io/github/forks/TACS-Studio/tacs-studio.github.io?style=for-the-badge&logo=github&color=6cc644" alt="Forks"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License"></a>
</p>

</div>

## 簡介

AI Chat 是由 **TACS Studio** 開發的免費線上 AI 對話工具，支援 Spark、GLM、Quark 三大語言模型，具備自訂 AI 人設、深色模式、Markdown 渲染等功能，完美適配手機和電腦。

> [!tip]
> 目前終端版已基本定型，網頁版還在調試修改中。有建議可以 Issues 我

## 功能特性

- 🤖 **多模型支援**: Spark、GLM、Quark 大型語言模型
- 🌐 **多語言介面**: 英文、簡體中文、繁體中文
- 🎭 **自訂人設**: 設定全域 AI 系統角色
- 🌙 **深色模式**: 明暗主題切換
- 📝 **Markdown 渲染**: 程式碼高亮、表格、列表等
- 📱 **響應式設計**: 全裝置適配

## 訪問地址

| 語言 | 連結 |
|------|------|
| English | https://tacs-studio.github.io/index.html |
| 简体中文 | https://tacs-studio.github.io/zh.cn.html |
| 繁體中文 | https://tacs-studio.github.io/zh.tw.html |
| 特簡化版 | https://tacs-studio.github.io/web/chat.html |
| 繪畫工具 | https://tacs-studio.github.io/web/draw.html |
## 支援的模型

- **GLM**: 智譜 AI 大模型
- **Spark**: 訊飛星火大模型
- **Quark**: 夸克大模型
- **Draw**: AI 繪畫大模型
- **More**: 還有更多等待添加

## 技術棧

- **前端**: HTML5 + CSS3 + JavaScript
- **圖示**: Font Awesome 6.4.0
- **Markdown**: marked.js
- **API**: 自訂後端介面

## 多語言客戶端

專案提供多種程式語言的客戶端實現，位於 `ai/` 目錄：

| 語言 | 檔案 | 用途 |
|------|------|------|
| Python | `ai.py` | 命令列客戶端 |
| Node.js | `ai.js` | 互動式終端 |
| PHP | `ai.php` | Web / CLI 雙模式 |
| Java | `ai.java` | Java 命令列 |
| C | `ai.c` | C 語言客戶端 |
| Shell | `ai.sh` | Shell 腳本 |
| HTML | `ai.html` | 獨立網頁 |

所有終端語言都可以使用 `運行方法 你的問題` 這種方式提問，例如：

```bash
python ai.py 你好
php ai.php 你是誰
[!note]
注意：NodeJS 版的客戶端為聊天式的方式，建議使用
# 複製專案
git clone https://github.com/TACS-Studio/tacs-studio.github.io.git

# 進入目錄
cd tacs-studio.github.io

# 啟動本地伺服器
python -m http.server 8000
# 或使用 serve
npx serve
專案結構
# 訪問 http://localhost:8000
tacs-studio.github.io/
├── index.html      # 英文版主頁面
├── zh.cn.html      # 簡體中文頁面
├── zh.tw.html      # 繁體中文頁面
├── script.js       # 主頁面腳本
├── style.css       # 樣式檔案
├── ai/             # 多語言客戶端目錄
│   ├── ai.py
│   ├── ai.js
│   ├── ai.php
│   ├── ai.java
│   ├── ai.c
│   ├── ai.sh
│   ├── ai.html
│   └── README.md
├── favicon.ico     # 網站圖示
└── LICENSE         # MIT 許可證
## 使用注意

1. AI 生成内容仅供参考，请结合自身独立判断
2. 请勿输入敏感个人信息或隐私数据
3. 不同模型能力各异，请按场景切换使用
4. 项目还在测试开发中，如有Bug请反馈

## 许可证

本项目根据MIT License发行，软件按原样提供。详情见[LICENSE](LICENSE)

> (测试时发现所用AI时间观念不准，可在人设里定义时间)<br>
> 如果不爱，请别伤害。如果喜爱，请给Star！
