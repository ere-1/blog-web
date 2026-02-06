const router = require('express').Router();
const adminController = require('./../controllers/admin.controller');


router.get('/', adminController.getAdminPage);
router.post('/', adminController.PostAdminPage);
router.post('/register', adminController.PostAdminPageRegister);

router.get('/dashboard',adminController.authMiddleware, adminController.getDashboardPage);

router.get('/add-post',adminController.authMiddleware, adminController.addPostPage);
router.post('/add-post',adminController.authMiddleware, adminController.postAddPostPage);

router.put('/edit-post/:id',adminController.authMiddleware, adminController.editPostPagePost);
router.get('/edit-post/:id',adminController.authMiddleware, adminController.editPostPage);

module.exports = router;