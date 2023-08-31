var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var CategoryRouter = require('./routes/category');
var productRouter = require('./routes/products');
var subCategoryRouter = require('./routes/subcategory');
var bannerRouter = require('./routes/banners');
var adminRouter = require('./routes/admin');
var productListRouter = require('./routes/productlist')
var userInterFaceRouter = require('./routes/userinterface')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/category',CategoryRouter);
app.use('/products',productRouter);
app.use('/subcategory',subCategoryRouter);
app.use('/banners',bannerRouter);
app.use('/admin',adminRouter);
app.use('/productlist',productListRouter)
app.use('/userinterface',userInterFaceRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
