const router = require('express').Router();
const adminController = require('./../controllers/admin.controller');


router.get('/', adminController.getAdminPage);
router.post('/', adminController.PostAdminPage);
router.post('/register', adminController.PostAdminPageRegister);
router.get('/dashboard',adminController.authMiddleware, adminController.getDashboardPage);

module.exports = router;