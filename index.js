const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');

const koaValidate = require('koa-async-validator');

const { sanitazers, validators } = require('./src/utils');

const create = require('./src/controllers/create');
const getList = require('./src/controllers/getList');

const app = new Koa();

app.use(koaBody());
app.use(koaValidate({
  customSanitizers: sanitazers,
  customValidators: validators,
}));

const useMethod = (method) => async (ctx) => {
  if (typeof ctx.request.body === 'string') {
    try {
      ctx.request.body = JSON.parse(ctx.request.body);
    } catch (error) {
      return ctx.throw(400, 'Данные не в формате JSON');
    }
  }
  await method.validator(ctx);
  const errors = await ctx.validationErrors(true);
  if (errors) {
    return ctx.throw(400, JSON.stringify(errors));
  }
  await method.sanitazer(ctx);
  return method.method(ctx);
};

router.get('/', useMethod(getList));

router.post('/lessons', useMethod(create));

app
  .use(router.routes())
  .use(router.allowedMethods());


const server = app.listen(3000);

module.exports = server;
