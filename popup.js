function createLi(url,title){
  const uNode = document.querySelector("#list");
  const divNode = document.createElement('div');
  divNode.style.textAlign="left";
  divNode.className = "form-group";
  // 生成新的input标签，值为下载链接
  const lNode = document.createElement('button');
  lNode.className = "btn btn-info";
  lNode.value = url;
  lNode.innerHTML = "点击复制：" + title;
  lNode.style.overflow = 'hidden';
  lNode.style.margin = '4px auto';
  lNode.style.marginLeft = '10px';
  lNode.style.maxWidth = "450px";
  lNode.style.textOverflow = 'ellipsis';
  lNode.setAttribute("data-clipboard-text",url)
  uNode.appendChild(divNode);
  divNode.appendChild(lNode);
}
var bg = chrome.extension.getBackgroundPage();
let urllist = [];
let title = bg.title;
if (bg.m3u8arr.length != 0) {
  urllist = bg.m3u8arr;
  for (let i in urllist) {
    createLi(urllist[i],title)
  }
}
var btns = document.querySelectorAll('button');
var clipboard = new ClipboardJS(btns);
//<div class="alert alert-success" role="alert">...</div>
clipboard.on('success',function(e){
  let noti = document.getElementById("noti");
  noti.style.visibility = "visible";
  $('#noti').delay(1000).hide(0);
  
})

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