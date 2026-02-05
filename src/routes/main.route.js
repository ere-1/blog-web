const router = require('express').Router();
const mainRouters = require('./../controllers/main.controller.js');
const Post = require('./../models/Post.js');

router.get('/', mainRouters.getHome);

router.get('/about', mainRouters.getAbout);

router.get('/post/:id', mainRouters.getPostPage);

module.exports = router;