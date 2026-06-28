#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TACS AI Chat Terminal Client
API: https://api.52vmy.cn/api/chat/glm
"""
import sys
import urllib.parse
import urllib.request
from typing import List


def show_usage() -> None:
    """打印使用帮助"""
    help_text = """
[*] Usage: python ai.py [question]
[*] 用法：python ai.py [你的问题]

示例:
    python ai.py 简单介绍一下人工智能
    python ai.py 写一段简短python代码
"""
    print(help_text)


def fetch_chat_response(message: str, timeout: int = 10) -> str:
    """
    请求AI接口获取回答
    :param message: 用户提问文本
    :param timeout: 请求超时时间(秒)
    :return: 接口原始返回字符串
    """
    msg_enc = urllib.parse.quote(message, safe="")
    url = f"https://api.52vmy.cn/api/chat/glm?msg={msg_enc}&type=text"

    # 添加浏览器UA，防止部分服务端拦截空UA请求
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; TACS-AIChat-Python/1.0)"
    }
    req = urllib.request.Request(url, headers=headers)

    with urllib.request.urlopen(req, timeout=timeout) as resp:
        # 优先读取编码
        charset = resp.info().get_charset() or "utf-8"
        raw_data = resp.read()
        return raw_data.decode(charset)


def main(args: List[str]) -> int:
    if len(args) < 2:
        show_usage()
        return 1

    user_msg = " ".join(args[1:])
    try:
        result = fetch_chat_response(user_msg)
        print("\n===== AI Chat =====\n" + result + "\n")
    except urllib.error.HTTPError as he:
        print(f"[!] 接口HTTP错误: 状态码 {he.code}")
    except urllib.error.URLError as ue:
        print(f"[!] 网络连接错误: {ue.reason}")
    except TimeoutError:
        print("[!] 请求超时，请检查网络或稍后重试")
    except Exception as e:
        print(f"[!] 未知错误: {type(e).__name__} - {e}")
    return 0


if __name__ == "__main__":
    exit_code = main(sys.argv)
    sys.exit(exit_code)
