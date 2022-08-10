console.log("开始发送请求")
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.type == 'sendData') {
        console.log("这是popup发送过来的请求")
        console.log(message.data)
    }
})