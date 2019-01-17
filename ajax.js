/** 封装一个参数处理方法 */
const getParams = data => {
  // data 为对象
  let normalizeParams = "";
  if (data) {
    let paramsArray = [];
    for (let [key, value] of Object.entries(data)) {
      paramsArray.push(key + "=" + value);
    }
    normalizeParams = paramsArray.join("&");
    return normalizeParams;
  } else {
    normalizeParams = "";
    return normalizeParams;
  }
};

/** 封装一个ajax请求方法 */
const ajax = options => {
  let params = getParams(options.data);
  // 获取 xhr 请求对象
  const xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  // 监听请求状态改变
  xhr.onreadystatechange = () => {
    console.log(
      "readyState:" + xhr.readyState,
      "status:" + xhr.status,
      "statusText" + xhr.statusText
    );
    if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304) {
      options.success(xhr.responseText);
    }
  };
  // 设置超时提醒 ie8不支持
  xhr.timeout = 10000;
  xhr.ontimeout = () => {
    alert("请求超时");
  };
  // 开启并发送请求
  if (options.type.toUpperCase() == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  }
  if (options.type.toUpperCase() == "POST") {
    xhr.open("POST", options.url, true);
    // 让post请求像html表单那样传递数据
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }
};

/** 使用ajax */
// post
var options = {
  type: "post",
  url: "http://127.0.0.1:3000/post",
  data: {
    name: "meili",
    age: "28"
  },
  success: responseText => {
    console.log("post返回了", responseText);
  }
};

ajax(options);

// get
ajax({
  type: "get",
  url: "http://127.0.0.1:3000/get",
  data: {},
  success: responseText => {
    console.log("get返回了", responseText);
  }
});

/** get 和 post 都可能出现跨域 */
