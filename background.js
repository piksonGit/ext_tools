chrome.contextMenus.create(
    {
        title:"下载此视频",
        onclick:function(){
            alert("即将开始下载视频");
        }
    }
);
console.log("测试背景")
//使用webRequest来拦截请求
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //将获取到的url传递给content_script
        chrome.tabs.query({active:true},function(tabs){
            if (details.url.indexOf(".m3u8")!=-1){
                chrome.tabs.sendMessage(tabs[0].id,{type:'sendData',data:details.url})
            }
            
        })
    },
    {urls:["<all_urls>"]},
)
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