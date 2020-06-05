var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
var session = require("express-session");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var app = express();

/* start
DEBUG=TRIVIA-TERROR-BACKEND:* npm start
DEBUG=TRIVIA-TERROR-BACKEND:* npm run devstart
sudo pkill -u postgres
*/

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

var indexRouter = require("./routes/index");
var questionRouter = require("./routes/question");
var categoryRouter = require("./routes/category");
var difficultyRouter = require("./routes/difficulty");
var gameRouter = require("./routes/game");
var trivia_terror_trollRouter = require("./routes/trivia_terror_troll");
var game_movesRouter = require("./routes/game_moves");
var avatarRouter = require("./routes/avatar");
var userRouter = require("./routes/user");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/setname", (req, res) => {
  req.session.name = "John";
  console.log(req.session);
  res.send("testing session");
});

app.get("/getname", (req, res) => {
  console.log(req.session.name);
  res.send(req.session.name);
});

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/difficulty", difficultyRouter);
app.use("/game", gameRouter);
app.use("/game_moves", game_movesRouter);
app.use("/trivia_terror_troll", trivia_terror_trollRouter);
app.use("/avatar", avatarRouter);
app.use("/", indexRouter);
app.use("/", questionRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
