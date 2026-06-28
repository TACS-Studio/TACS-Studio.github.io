#!/usr/bin/env php
<?php
/**
 * TACS AI Chat PHP Client
 * Support CLI mode & Web GET mode
 */
declare(strict_types=1);

// 统一获取输入（Web GET 参数 优先，其次 CLI 命令行参数）
$getMessage = function(): ?string {
    // Web 请求模式
    if (isset($_GET['msg']) && trim((string)$_GET['msg']) !== '') {
        return trim((string)$_GET['msg']);
    }
    // CLI 终端模式
    if (isset($_SERVER['argv']) && count($_SERVER['argv']) > 1) {
        $args = array_slice($_SERVER['argv'], 1);
        return trim(implode(' ', $args));
    }
    return null;
};

$showUsage = function(): void {
    $text = <<<HELP
[*] Usage (CLI): php ai.php [question]
[*] 使用方法（终端）: php ai.php [你的问题]
[*] Usage (Web): ?msg=你的问题

示例:
    php ai.php 什么是人工智能
HELP;
    echo $text . PHP_EOL;
};

$fetchApi = function(string $prompt, int $timeout = 10): string {
    $encoded = urlencode($prompt);
    $url = "https://api.52vmy.cn/api/chat/glm?msg={$encoded}&type=text";

    $ctx = stream_context_create([
        'http' => [
            'timeout' => $timeout,
            'user_agent' => 'TACS-AIChat-PHP/1.0'
        ]
    ]);

    $raw = @file_get_contents($url, false, $ctx);
    if ($raw === false) {
        throw new RuntimeException("API request failed, network error or timeout");
    }
    return $raw;
};

// 主逻辑
$msg = $getMessage();
if ($msg === null) {
    $showUsage();
    exit(1);
}

try {
    $result = $fetchApi($msg);
    echo PHP_EOL . "===== AI Chat =====" . PHP_EOL . $result . PHP_EOL . PHP_EOL;
} catch (RuntimeException $e) {
    echo "[!] 请求失败: " . $e->getMessage() . PHP_EOL;
    exit(2);
}
exit(0);
