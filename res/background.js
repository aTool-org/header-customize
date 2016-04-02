var refererInjecting = false; //用户勾选的是否注入
var referer = ""; //用户填写的refer
// var refererHeader = { "name": "Referer", "value": "" }; //referer注入header信息

var uaInjecting = false;
var ipInjecting = false; 


// referer ============================
refererInjector = function (details) {
    details.requestHeaders.push({ "name": "Referer", "value": referer });
    return { "requestHeaders": details.requestHeaders };
},
startRefererInjecting = function () {
    if(! refererInjecting) {
      chrome.webRequest.onBeforeSendHeaders.addListener(refererInjector, {urls: ["<all_urls>"], types: ["main_frame"]}, ["blocking", "requestHeaders"]);
      refererInjecting = true;
    }
},
stopRefererInjecting = function () {
    chrome.webRequest.onBeforeSendHeaders.removeListener(refererInjector);
    refererInjecting = false;
},


// ua ============================
uaInjector = function (details) {
    details.requestHeaders.push({ "name": "User-Agent", "value": generateUA() });
    return { "requestHeaders": details.requestHeaders };
},
startUAInjecting = function () {
    if(! uaInjecting) {
      chrome.webRequest.onBeforeSendHeaders.addListener(uaInjector, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
      uaInjecting = true;
    }
},
stopUAInjecting = function () {
    chrome.webRequest.onBeforeSendHeaders.removeListener(uaInjector);
    uaInjecting = false;
},


// ip ============================
ipInjector = function (details) {
    var IP = getChineseIp();
    details.requestHeaders.push({ "name": "X-Forwarded-For", "value": IP });
    details.requestHeaders.push({ "name": "X-Client-Ip", "value": IP });
    return { "requestHeaders": details.requestHeaders };
},
startIPInjecting = function () {
    if(! ipInjecting) {
      console.log("add ip");
      chrome.webRequest.onBeforeSendHeaders.addListener(ipInjector, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
      ipInjecting = true;
    }
},
stopIPInjecting = function () {
    chrome.webRequest.onBeforeSendHeaders.removeListener(ipInjector);
    ipInjecting = false;
};