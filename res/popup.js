document.addEventListener('DOMContentLoaded', function() {
    var backgroundPage = chrome.extension.getBackgroundPage();

    var refererSwitch = document.querySelector("#referer_switch");  //referer 开关
    var referer = document.querySelector("#referer");               //referer 输入框

    var uaRandomSwitch = document.querySelector("#random_ua");      // UA 随机 开关

    var ipRandomSwitch = document.querySelector("#random_ip");      // IP 随机 开关

    // 执行初始化
    initDOM();
    // load config from storage
    function initDOM() {
        // load locale
        document.querySelector("#referer_text").innerHTML = chrome.i18n.getMessage("refererSwitchOn");
        referer.setAttribute("placeholder", chrome.i18n.getMessage("writeCusReferer"));
        document.querySelector("#ua_text").innerHTML = chrome.i18n.getMessage("randomUASwitchOn");
        document.querySelector("#ip_text").innerHTML = chrome.i18n.getMessage("randomIPSwitchOn");

        chrome.storage.local.get(["referer", "refererInjecting", "randomUA", "randomIP"], function(data) {
            // refererInjecting
            if (data.refererInjecting) {
                refererSwitch.checked = true;
                referer.disabled = false;
                referer.style.color = "green";
                referer.focus();

            }
            else {
                referer.disabled = true;
                referer.style.color = "red";
            }
            // referer
            if (data.referer) {
                referer.value = data.referer;
                backgroundPage.referer = data.referer;
            }

            // ua
            if (data.randomUA) {
                uaRandomSwitch.checked = true;
                // backgroundPage.uaInjecting = true;
            }
            else {
                uaRandomSwitch.checked = false;
            }

            // ip
            if (data.randomIP) {
                ipRandomSwitch.checked = true;
                // backgroundPage.ipInjecting = true;
            }
            else {
                ipRandomSwitch.checked = false;
            }
            // 开始注册后台任务
            registeBackground();
        });
    }

    function saveConfig(refererText, isRefererInjecting, isRandomUA, isRandomIP) {
        chrome.storage.local.set({
            'referer': refererText, 
            "refererInjecting": isRefererInjecting,
            "randomUA": isRandomUA,
            "randomIP": isRandomIP
        }, function() {
            // do nothing
        });
    }

    // Some Event
    function registeBackground() {
        // referer开关
        if (refererSwitch.checked) backgroundPage.startRefererInjecting();

        refererSwitch.addEventListener("click", function(e) {
            saveConfig(referer.value, refererSwitch.checked, uaRandomSwitch.checked, ipRandomSwitch.checked);

            if (refererSwitch.checked) {
                referer.disabled = false;
                referer.style.color = "green";
                backgroundPage.startRefererInjecting();
                referer.focus();
            } else {
                referer.disabled = true;
                referer.style.color = "red";
                backgroundPage.stopRefererInjecting();
            }
        });
        // referer text
        referer.addEventListener("change", function(e) {
            saveConfig(referer.value, refererSwitch.checked, uaRandomSwitch.checked, ipRandomSwitch.checked);

            backgroundPage.referer = referer.value;
            if (refererSwitch.checked) {
                backgroundPage.startRefererInjecting();
            }
        });

        // ua开关
        if (uaRandomSwitch.checked) backgroundPage.startUAInjecting();

        uaRandomSwitch.addEventListener("click", function(e) {
            saveConfig(referer.value, refererSwitch.checked, uaRandomSwitch.checked, ipRandomSwitch.checked);

            if (uaRandomSwitch.checked) {
                backgroundPage.startUAInjecting();
            } else {
                backgroundPage.stopUAInjecting();
            }
        });

        // ip开关
        if (ipRandomSwitch.checked) backgroundPage.startIPInjecting();

        ipRandomSwitch.addEventListener("click", function(e) {
            saveConfig(referer.value, refererSwitch.checked, uaRandomSwitch.checked, ipRandomSwitch.checked);
            if (ipRandomSwitch.checked) {
                backgroundPage.startIPInjecting();
            } else {
                backgroundPage.stopIPInjecting();
            }
        });
    }
});