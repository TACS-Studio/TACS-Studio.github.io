import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * TACS AI Chat Java Terminal Client
 * API: https://api.52vmy.cn/api/chat/glm
 */
public final class AiChat {
    // 超时毫秒
    private static final int TIMEOUT_MS = 10000;
    private static final String USER_AGENT = "TACS-AIChat-Java/1.0";

    public static void main(String[] args) {
        // 参数校验
        if (args.length < 1) {
            printUsage();
            System.exit(1);
        }

        // 拼接提问文本
        String rawMsg = String.join(" ", args).trim();
        if (rawMsg.isBlank()) {
            System.out.println("[!] 问题不能为空");
            System.exit(1);
        }

        try {
            String encodedMsg = URLEncoder.encode(rawMsg, StandardCharsets.UTF_8.name());
            String apiUrl = "https://api.52vmy.cn/api/chat/glm?msg=" + encodedMsg + "&type=text";

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            try {
                // 请求配置
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(TIMEOUT_MS);
                conn.setReadTimeout(TIMEOUT_MS);
                conn.setRequestProperty("User-Agent", USER_AGENT);

                int responseCode = conn.getResponseCode();
                BufferedReader reader;
                // 区分正常流 / 错误流
                if (responseCode >= 200 && responseCode < 300) {
                    reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
                } else {
                    reader = new BufferedReader(new InputStreamReader(conn.getErrorStream(), StandardCharsets.UTF_8));
                }

                StringBuilder responseBuffer = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    responseBuffer.append(line);
                }
                reader.close();

                // 输出结果
                System.out.println("\n===== AI Chat =====");
                System.out.println(responseBuffer);
                System.out.println();

            } finally {
                conn.disconnect();
            }
        } catch (Exception e) {
            System.out.println("[!] 请求出错：" + e.getMessage());
            e.printStackTrace();
            System.exit(2);
        }
        System.exit(0);
    }

    /** 打印帮助信息 */
    private static void printUsage() {
        String help = """
[*] Usage：java AiChat [question]
[*] 用法：java AiChat [你的问题]

示例:
    java AiChat 简单介绍人工智能
                """;
        System.out.println(help);
    }
}
