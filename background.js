chrome.contextMenus.create(
    {
        title:"下载此视频",
        onclick:function(){
            alert("即将开始下载视频");
        }
    }
);
var m3u8arr = [];
//标题为键名，m3u8数组为值名。
var websiteInfo = {}
var title = "视频标题";
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.title){
        title = request.title;
      }
    }
  );
//使用webRequest来拦截请求，此监听器会监听所有网站发出的事件，所以需要手动将这些事件按照网站url来进行归类才行。
//一次请求和次次请求
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        //改为正则，判断是不是以.m3u8结尾或者是包含.m3u8?
        //使用js的url解析器可以方便做到这些。
        let url = new URL(details.url);

        if(url.pathname.indexOf(".m3u8")!= -1) {
            console.log(details);
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
        location.reload();
    }
    console.log('----------------------')
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