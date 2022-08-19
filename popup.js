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
//e.text就是m3u8的地址
//都要加await
clipboard.on('success',async function(e){
  //on success的回调事件中解析m3u8文件并且将所有的ts文件缓存起来
  //假定有两种情况，1. ts的path和host都是跟m3u8链接一样的。2. 两者不一样，但是在m3u8文件中会直接写明.ts文件的完整链接
  let url = new URL(e.text);
  console.log(url)
  let noti = document.getElementById("noti");
  noti.style.visibility = "visible";
  $('#noti').delay(1000).hide(0);
  let res = await fetch(e.text);
  console.log(await res.text());
  console.log("剪切板回调");
  console.log(e);
  
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