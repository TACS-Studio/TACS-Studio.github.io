// rules.js
export const XSS_RULES = [/<script.*?>.*?<\/script>/i, /javascript:/i, ...];
export const SQL_RULES = [/union.*?select/i, ...];
export const UA_BLACKLIST = ['curl', 'python', ...];
// 后续在firewall.js中引入，直接调用
