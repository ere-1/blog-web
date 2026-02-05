// env config
require('dotenv').config();

// import libs
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const path = require('path');

// import routes
const mainRouter = require('./src/routes/main.route');

// app init
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', mainRouter);

// server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
