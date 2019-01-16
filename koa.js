const koa = require("koa");
const app = new koa();
/**post参数处理中间件*/
const bodyParser = require("koa-bodyparser");
/**跨域处理中间件 */
const CORS = require("koa2-cors");

/**创建一个路由 */
const Router = require("koa-router");
const router = new Router();

router.post("/post", (ctx, next) => {
  console.log(typeof ctx.request.body);
  ctx.body = ctx.request.body;
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
