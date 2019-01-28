const router = require("koa-router")();

router.get("/", (ctx, next) => {
  ctx.body = "Root";
});

router.get("/user/:id", (ctx, next) => {
  const {id} = ctx.params;
  ctx.body = `user: ${id}`;
});

router.get("/users", (ctx, next) => {
  const {type, sort} = ctx.query;
  ctx.body = `users => type:${type} sort:${sort}`;
});

module.exports = router;
