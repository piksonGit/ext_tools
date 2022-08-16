console.log("开始发送请求")
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.type == 'sendData') {
        console.log("这是popup发送过来的请求")
        console.log(message.data)
    }
})
let title = "视频";
//必须等网页加载完成之后再去获得标题，不然就是什么都得不到
document.onreadystatechange = function(){
    if (document.readyState == "complete") {
        let titles = document.getElementsByTagName("title");
        console.log("本网页的标题为");
        console.log(titles);
        console.log(titles.length);
        console.log(titles[0].text);
        if (titles.length != 0) {
            title = titles[0].text;
        }
        chrome.runtime.sendMessage({title},function(response){
        
        })
    }
}



