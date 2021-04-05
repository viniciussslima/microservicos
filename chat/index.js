process.title = "spruce/chat";

require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");

const routes = require("./routes");
const sio = require("./handlers/socket");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();
const server = http.createServer(app);

sio.attach(server);

// app.use((req, res, next) => {
//   req.sio = sio;
//   next();
// });
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

server.listen(process.env.SERVICE_PORT, () => {
  console.log(`Serviço de chat rodando na porta ${process.env.SERVICE_PORT}`);
});
