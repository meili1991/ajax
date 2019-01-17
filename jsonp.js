const btn = document.getElementById("btn");
btn.addEventListener(
  "click",
  function() {
    // 生成script标签并添加对应的请求src
    let script = document.createElement("script");
    script.src = "http://127.0.0.1:3000/jsonp?type=jsonp&&callback=backFun";
    document.body.appendChild(script);
  },
  false
);

// 定义好jsonp核心执行函数
function backFun(res) {
  console.log(res);
}
