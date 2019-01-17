const koa = require("koa");
const app = new koa();
/**post参数处理中间件*/
const bodyParser = require("koa-bodyparser");
/**跨域处理中间件 */
const CORS = require("koa2-cors");

/**创建一个路由 */
const Router = require("koa-router");
const router = new Router();

router
  .post("/post", async (ctx, next) => {
    await new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve();
      }, 2000);
    }); // await以后函数会暂停执行但并没有结束
    console.log(typeof ctx.request.body);
    ctx.body = ctx.request.body;
  })
  .get("/jsonp", async (ctx, next) => {
    let query = ctx.query;
    // jsonp 的本质就是服务器返回一个事先商定好的函数执行的文本
    ctx.body = query.callback + "('我是jsonp返回的东东')";
  });

app.use(
  CORS({
    origin: function(ctx) {
      // if (ctx.url === "/cors") {
      //   return "*"; // 允许来自所有域名请求
      // } else {
      //   return "http://localhost:3201";
      // }
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"], //设置允许的HTTP请求类型
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("koa框架启动于http://127.0.0.1:3000");
});
