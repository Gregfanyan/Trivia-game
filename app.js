var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();



let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.use(cors());


app.use(bodyParser.urlencoded());

var indexRouter = require('./routes/index');
var questionRouter = require('./routes/question');
var categoryRouter = require('./routes/category');
var difficultyRouter = require('./routes/difficulty');
var gameRouter = require('./routes/game');
var trivia_terror_trollRouter = require('./routes/trivia_terror_troll');
var game_movesRouter = require('./routes/game_moves');







/* start
DEBUG=TRIVIA-TERROR-BACKEND:* npm start
DEBUG=TRIVIA-TERROR-BACKEND:* npm run devstart
sudo pkill -u postgres
*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', questionRouter);
app.use('/', categoryRouter);
app.use('/', difficultyRouter);
app.use('/', gameRouter);
app.use('/', game_movesRouter);
app.use('/', trivia_terror_trollRouter);




app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

