function createLi(url){
  const uNode = document.querySelector("#list");
  const lNode = document.createElement('li');
  lNode.className = "list-group-item";
  lNode.innerHTML = url;
  uNode.appendChild(lNode);
}
var bg = chrome.extension.getBackgroundPage();
let urllist = [];
if (bg.m3u8arr.length != 0) {
  urllist = bg.m3u8arr;
  for (let i in urllist) {
    createLi(urllist[i])
  }
}
/* chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    //将获取到的url传递给content_script
    chrome.tabs.query({ active: true }, function (tabs) {
      if (details.url.indexOf(".m3u8") != -1) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'sendData', data: details.url })
      } else {
        chrome.tabs.sendMessage(tabs[0].id,{type:'sendData',data:details.url})
      }

    })
  },
  { urls: ["<all_urls>"] },
) */