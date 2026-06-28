/**
 * TACS AI Chat C Client
 * Compile: gcc ai.c -o ai -lcurl
 * API: https://api.52vmy.cn/api/chat/glm
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

#define MSG_BUF_MAX     512
#define URL_BUF_MAX     1024
#define TIMEOUT_SEC     10

struct Memory {
    char* buffer;
    size_t length;
};

/**
 * curl 接收数据回调
 */
static size_t write_callback(void* data, size_t size, size_t nmemb, void* mem)
{
    struct Memory* m = (struct Memory*)mem;
    const size_t total = size * nmemb;
    char* new_buf = realloc(m->buffer, m->length + total + 1);
    if (new_buf == NULL) {
        return 0;
    }
    m->buffer = new_buf;
    memcpy(m->buffer + m->length, data, total);
    m->length += total;
    m->buffer[m->length] = '\0';
    return total;
}

/**
 * URL编码，返回堆内存，使用后必须free()
 */
static char* url_encode(const char* str)
{
    const size_t src_len = strlen(str);
    char* output = malloc(src_len * 3 + 1);
    if (output == NULL) {
        return NULL;
    }
    char* p = output;
    for (; *str != '\0'; str++) {
        if ((*str >= '0' && *str <= '9') ||
            (*str >= 'A' && *str <= 'Z') ||
            (*str >= 'a' && *str <= 'z') ||
            strchr("-_.~", (unsigned char)*str))
        {
            *p++ = *str;
        } else {
            sprintf(p, "%%%02X", (unsigned char)*str);
            p += 3;
        }
    }
    *p = '\0';
    return output;
}

static void print_usage(void)
{
    const char help[] =
        "[*] Usage: ./ai [question]\n"
        "[*] 用法：./ai [你的问题]\n"
        "示例:\n"
        "    ./ai 简单介绍人工智能\n";
    fputs(help, stdout);
}

int main(int argc, char* argv[])
{
    // 参数检查
    if (argc < 2) {
        print_usage();
        return EXIT_FAILURE;
    }

    char full_msg[MSG_BUF_MAX] = {0};
    size_t pos = 0;
    for (int i = 1; i < argc; i++) {
        const size_t arg_len = strlen(argv[i]);
        // 防止缓冲区溢出
        if (pos + arg_len + 1 >= MSG_BUF_MAX) {
            fprintf(stderr, "[!] 输入文本过长，超出缓冲区限制\n");
            return EXIT_FAILURE;
        }
        memcpy(full_msg + pos, argv[i], arg_len);
        pos += arg_len;
        full_msg[pos++] = ' ';
    }
    if (pos > 0) {
        full_msg[pos - 1] = '\0';
    }
    if (strlen(full_msg) == 0) {
        fprintf(stderr, "[!] 问题不能为空\n");
        return EXIT_FAILURE;
    }

    char* msg_encode = url_encode(full_msg);
    if (msg_encode == NULL) {
        fprintf(stderr, "[!] 内存分配失败（URL编码）\n");
        return EXIT_FAILURE;
    }

    char api_url[URL_BUF_MAX] = {0};
    const int print_ret = snprintf(api_url, sizeof(api_url),
        "https://api.52vmy.cn/api/chat/glm?msg=%s&type=text",
        msg_encode);
    free(msg_encode);
    if (print_ret < 0 || (size_t)print_ret >= URL_BUF_MAX) {
        fprintf(stderr, "[!] API URL缓冲区溢出\n");
        return EXIT_FAILURE;
    }

    // curl初始化
    if (curl_global_init(CURL_GLOBAL_ALL) != CURLE_OK) {
        fprintf(stderr, "[!] curl_global_init 失败\n");
        return EXIT_FAILURE;
    }
    CURL* curl = curl_easy_init();
    if (curl == NULL) {
        fprintf(stderr, "[!] curl_easy_init 失败\n");
        curl_global_cleanup();
        return EXIT_FAILURE;
    }

    struct Memory res_data = {NULL, 0};
    const char user_agent[] = "TACS-AIChat-C/1.0";

    curl_easy_setopt(curl, CURLOPT_URL, api_url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &res_data);
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, (long)TIMEOUT_SEC);
    curl_easy_setopt(curl, CURLOPT_USERAGENT, user_agent);

    CURLcode ret = curl_easy_perform(curl);
    if (ret != CURLE_OK) {
        fprintf(stderr, "[!] 请求出错：%s\n", curl_easy_strerror(ret));
    } else {
        if (res_data.buffer != NULL) {
            printf("\n===== AI Chat =====\n%s\n\n", res_data.buffer);
        } else {
            printf("\n===== AI Chat =====\n(Empty response)\n\n");
        }
    }

    // 资源释放顺序不能乱
    curl_easy_cleanup(curl);
    curl_global_cleanup();
    free(res_data.buffer);

    return EXIT_SUCCESS;
}
