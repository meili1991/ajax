const btn = document.getElementById("btn");
btn.addEventListener(
  "click",
  function() {
    // 生成script标签并添加对应的请求src
    let script = document.createElement("script");
    // jsonp 默认函数名参数的key为callback jquery跨域也一样
    script.src = "http://127.0.0.1:3000/jsonp?type=json&&callback=backFun";
    document.body.appendChild(script);
  },
  false
);

// 定义好jsonp核心执行函数
function backFun(res) {
  console.log(res);
}

/* jsonp的过程就是 利用script标签的src属性不受同源策略限制的特性, 从服务器获取一个函数执行的拼装放入script标签内执行，所以核心是先定义好要执行的函数*/
