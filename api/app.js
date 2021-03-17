var createError = require("http-errors");
var express = require("express");
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("file-system");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var accountRouter = require("./routes/auth");
var meRouter = require("./routes/settings");
var extraRouter = require("./routes/extras/wordbeater/main");
var categoryRouter = require("./routes/category");
var restApi = require("./routes/api/v1/index");
var publicApiRouter = require("./routes/developer/api");
var chatRouter = require("./routes/chat");
var counterRouter = require("./utils/handlers/counter");

var app = express();

app.conf = require("./config/app");

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

var cooky = {
  secret: "work hard",
  resave: true,
  expires: new Date() * 60 * 60 * 24 * 7,
  saveUninitialized: true,
};

app.sessionMiddleware = session(cooky);

app.set("trust proxy", 1); // trust first proxy
app.use(app.sessionMiddleware);
app.use(
  logger("common", {
    stream: fs.createWriteStream(
      __dirname.endsWith(".spruce")
        ? __dirname + "/../data/out.log"
        : __dirname + "/out.log",
      { flags: "a" }
    ),
  })
);
app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(counterRouter); // <------------------- OQ E ISSO

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/", indexRouter);
app.use("/u", usersRouter);
app.use("/account", accountRouter);
app.use("/me", meRouter);
app.use("/api", restApi);
app.use("/category", categoryRouter);
app.use("/products", extraRouter);
app.use("/chat", chatRouter);
app.use("/developer", publicApiRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
