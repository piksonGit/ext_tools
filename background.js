chrome.contextMenus.create(
    {
        title:"下载此视频",
        onclick:function(){
            alert("即将开始下载视频");
        }
    }
);
var m3u8arr = [];
console.log("测试背景")
//使用webRequest来拦截请求
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.url.indexOf(".m3u8")!= -1) {
            
            m3u8arr.push(details.url);
        }
        //将获取到的url传递给content_script
       /*  chrome.tabs.query({active:true},function(tabs){
            if (details.url.indexOf(".m3u8")!=-1){
                chrome.tabs.sendMessage(tabs[0].id,{type:'sendData',data:details.url})
            }
            
        }) */
    },
    {urls:["<all_urls>"]},
);
chrome.tabs.onUpdated.addListener(function (tabId, selectInfo,tab){
   /*  chrome.storage.sync.get([tabId], function (result) {
        if (result) {
            console.log(result)
        } else {
            chrome.storage.set({})
        }
    }); */
    if(selectInfo.status == "loading") {
        m3u8arr = [];
    }
    console.log(selectInfo)
    console.log(tab)
})
/* chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if (message.name === "requestinfo") {
        if (message.content) {
            let data = message.content
            if (data.indexOf(".png")!= -1){
                chrome.tabs.query({active:true, currentWindow:true},function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id,{type:'sendData',data})
                })
            }
           
        }
    }
}); */