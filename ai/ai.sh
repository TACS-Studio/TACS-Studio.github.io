#!/bin/sh
set -euo pipefail

# URL编码函数 (POSIX 兼容，安全处理所有字符)
urlencode() {
    local _str="$1"
    printf "%s" "$_str" | od -An -t x1 | tr -s '[:space:]' '\n' | awk '
    BEGIN {
        safe_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_~.-"
    }
    {
        hex = $1
        char = sprintf("%c", strtonum("0x" hex))
        if (index(safe_chars, char) > 0) {
            printf "%s", char
        } else {
            printf "%%%02X", strtonum("0x" hex)
        }
    }
    ' | tr -d '\n'
}

# 使用帮助
usage() {
    cat <<EOF
[*] Usage: $0 [question]
[*] 使用方法: sh $0 [你的问题]

示例:
    sh $0 什么是人工智能
EOF
}

# 参数校验
if [ $# -lt 1 ]; then
    usage
    exit 1
fi

# 拼接参数
question="$*"
enc_q=$(urlencode "$question")
api_endpoint="https://api.52vmy.cn/api/chat/glm?msg=${enc_q}&type=text"

# 请求API，增加容错（curl失败不会直接崩溃）
result=""
if result=$(curl -s -f --max-time 10 "$api_endpoint"); then
    :
else
    printf "\n[!] API 请求失败，请检查网络或接口地址\n\n"
    exit 2
fi

# 输出结果
printf "\n===== AI Chat =====\n%s\n\n" "$result"
