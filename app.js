var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var customersRouter = require('./routes/customers');
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const dbconnection = {
  host: 'localhost',
  port: 5432,
  database: 'test',
  user: 'test',
  password: 'test',
  max: 30 // use up to 30 connections
}

// for production with either dotenv or run as env $(cat .env | xargs) node ./bin/www or simmiliar
// const dbconnection = {
//   host:  process.env.HOST,
//   port: process.env.PORT,
//   database: process.env.DATABASE,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   max: process.env.MAX // use up to 30 connections
// }


const PgConnector = require('./modules/pgConnector');

const pg = new PgConnector(dbconnection)


app.use('/', indexRouter);
app.use('/items', itemsRouter(pg));
app.use('/customers', customersRouter(pg));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;