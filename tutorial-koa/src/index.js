require("dotenv").config();
const Koa = require("koa");
const app = new Koa();

const mode = process.env.NODE_ENV || "dev";
const PORT =
  mode === "production" ? process.env.LIVE_PORT : process.env.DEV_PORT;

//logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

//x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(require('./routes').routes());

app.start = (port=PORT) => {
  app.listen(port,'0.0.0.0', () => {
    console.log("Koa server is listening to port: " + port);
  });
};

module.exports = app;
