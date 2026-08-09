// 设备白名单：只允许你的设备访问（生成唯一设备指纹）
function getDeviceFingerprint() {
    // 用浏览器信息+屏幕信息生成唯一指纹（你的设备会固定一个值）
    const info = navigator.userAgent + window.screen.width + window.screen.height + navigator.language;
    let hash = 0;
    for (let i = 0; i < info.length; i++) {
        hash = ((hash << 5) - hash) + info.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString();
}

// 你的设备指纹（先运行一次获取，再替换成固定值）
const MY_DEVICE_FINGERPRINT = "替换成你的设备指纹"; // 关键：按下面步骤获取

// 页面加载先校验设备，不是你的设备直接拦截
window.addEventListener('DOMContentLoaded', () => {
    const currentFingerprint = getDeviceFingerprint();
    // 第一次打开时，控制台会输出你的设备指纹，复制替换上面的MY_DEVICE_FINGERPRINT
    console.log('你的设备指纹：', currentFingerprint);
    
    if (currentFingerprint !== MY_DEVICE_FINGERPRINT) {
        // 不是你的设备，直接触发拦截
        sessionStorage.setItem('firewall_intercept_reason', '非授权设备访问，已拦截');
        showIntercept();
        // 拦截所有操作，不让别人退出
        document.addEventListener('keydown', (e) => e.preventDefault());
        document.addEventListener('backbutton', (e) => e.preventDefault());
    } else {
        // 是你的设备，正常启动防火墙
        if (window.location.pathname.includes('firewall.html')) {
            const reason = sessionStorage.getItem('firewall_intercept_reason');
            if(reason) showIntercept();
        }
    }
});
