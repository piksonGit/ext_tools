
var backgroundPageConnection = chrome.runtime.connect({
    name:"devtools-page"
});
backgroundPageConnection.onMessage.addListener(function(message){});
//获取发出的请求
chrome.runtime.sendMessage({
    name:"requestinfo",
    tabId:chrome.devtools.inspectedWindow.tabId,
    content:"what's the fuck"
})
chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
        //content就是接口返回的内容
        chrome.runtime.sendMessage({
            name:'requestinfo',
            tabId:chrome.devtools.inspectedWindow.tabId,
            content:request.request.url,
        });

        //暂时不用获取接口的返回值，只获取请求地址就可以
        request.getContent(function(content,encoding){

        })
    }
)
    