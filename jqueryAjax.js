$.ajax({
  type: "post",
  url: "http://127.0.0.1:3000/post",
  data: {
    name: "meili",
    age: "28"
  },
  success: function(data, textStatus, jqXHR) {
    // data 是返回的数据 jquery 已经将其转换为对象
    // textStatus 可能为"success"、"notmodified"等
    // jqXHR 是经过jQuery封装的XMLHttpRequest对象
    console.log("jquery Ajax返回的数据", data);
  }
});

const btn2 = document.getElementById("btn2");
btn2.addEventListener(
  "click",
  function() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:3000/jsonp",
      dataType: "jsonp",
      jsonpCallback: "backFun",
      data: {
        type: "json"
      }
    });
    // jquery jsonp 的实质还是利用src属性，只是按照ajax形式封装了
  },
  false
);
