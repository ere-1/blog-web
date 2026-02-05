const router = require('express').Router();
const mainRouters = require('./../controllers/main.controller.js');


router.get('/', mainRouters.getHome);

router.get('/about', mainRouters.getAbout);

module.exports = router;