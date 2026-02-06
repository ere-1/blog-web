// env config
require('dotenv').config();

// import libs
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo').default;
console.log(MongoStore);
const path = require('path');
const connect = require('./src/config/db')
const session = require('express-session');
const methodOverride = require('method-override')

// import routes
const mainRouter = require('./src/routes/main.route');
const adminRouter = require('./src/routes/admin.route');

// app init
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
  })
}))
 
// template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// connectDB
connect();
// routes
app.use('/', mainRouter);
app.use('/admin', adminRouter);

// server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
