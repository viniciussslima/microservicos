require("dotenv").config();

var mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(process.env.SERVICE_PORT, () => {
  console.log(`Serviço de feed rodando na porta ${process.env.SERVICE_PORT}`);
});

module.exports = app;
