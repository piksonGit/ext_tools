console.log("开始发送请求")
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.type == 'sendData') {
        console.log(message.data)
    }
})