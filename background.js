chrome.contextMenus.create(
    {
        title:"下载此视频",
        onclick:function(){
            alert("即将开始下载视频");
        }
    }
);
console.log("测试背景")
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
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
});