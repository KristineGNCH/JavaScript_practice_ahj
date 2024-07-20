const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const WS = require("ws");
const contacts = [];
const messagesObj = {
  status: "ok",
  timestamp: Date.now(),
  messages: [
    {
      id: 1,
      from: "anya@ivanova",
      user: "Hello from Anya dfm ene ne e ef e eeffefje",
      body: "Long message body here",
      received: 1553108200,
    },
    {
      id: 2,
      from: "alex@petrov",
      user: "Hello from Alex Petrov!",
      body: "Long message body here",
      received: 1553107200,
    },
  ],
};

const app = new Koa();
app.use(cors());

app.use(
  koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
  })
);

app.use(async (ctx) => {
  const method = ctx.request.querystring;
  const newName = ctx.request.body.text;

  switch (method) {
    case "method=getMessages":
      ctx.response.body = { response: messagesObj };
      return;

    case "method=addMessage":
      let arr = [];
      messagesObj.messages.forEach((a) => arr.push(a.id));
      idMax = Math.max.apply(null, arr);
      messagesObj.messages.push({
        id: idMax + 1,
        from: ctx.request.body.from,
        user: ctx.request.body.user,
        body: ctx.request.body.body,
        received: Number(ctx.request.body.received),
      });
      ctx.response.body = { response: "Сообщение добавлено" };
      return;

    case "method=getName":
      if (!contacts.find((a) => a === newName)) {
        contacts.push(newName);
        ctx.response.body = { response: contacts, name: newName };
      } else {
        ctx.response.body = { response: `Псевдоним ${newName} уже занят` };
      }
      return;

    default:
      ctx.response.status = 404;
      return;
  }
});

const PORT = process.env.PORT || 3010;
const server = http.createServer(app.callback());
const hostname = "127.0.0.1";

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);

    return;
  }
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
