// cach 1
// const router = require('express').Router();
const express = require('express');
const api = require('../api/api');
const faker = require('faker');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const helperController = require('../controllers/helperController');
const aboutMeController = require('../controllers/aboutMeController');
const userController = require('../controllers/userController');
const testController = require('../controllers/testController');
const router = express.Router();

router.get('/server', authController.isLoggedIn, postController.getPostHome);
// router.get('/post/:page', authController.isLoggedIn, postController.getPostHome);
router.get('/about-me', authController.isLoggedIn,aboutMeController.getAboutMe);

// auto create faker
router.get('/auto-create', helperController.autoCreateData);
// POST ROUTES
// router.get('/detail/:slug', authController.isLoggedIn, postController.getPost);
router.get('/add-product', authController.protect, authController.restrictTo('admin'),postController.getAddPost);

router.post('/add-update-product', api.MulterHelper().upload.fields([
    { name: 'photoCover', maxCount: 1 },
    { name: 'photoContent_1', maxCount: 1 },
    { name: 'photoContent_2', maxCount: 1 },
    { name: 'photoContent_3', maxCount: 1 },
    { name: 'photoContent_4', maxCount: 1 },
    { name: 'photoContent_5', maxCount: 1 },
    { name: 'photoContent_6', maxCount: 1 },
    { name: 'photoContent_7', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), postController.addUpdatePost);
// login -> restrict=admin -> next allow delete
router.delete('/delete/:id', authController.protect, authController.restrictTo('admin'), postController.deletePost);
router.get('/update/:id', authController.protect, authController.restrictTo('admin'),postController.getUpdatePost);
// USER ROUTES
router.get('/me', authController.protect,userController.getAccount);
router.patch('/updateMe',api.MulterHelper().upload.single('photo'), authController.protect, userController.updateMeData);
router.patch('/updateMyPassword',authController.protect,userController.updatePassword);
// sigup
// router.get('/sigup',userController.getSignUp);
router.post('/sigup', authController.sigup);

// login
// router.get('/login', userController.getLogin);
// AUTHENTICATION USER
router.get('/logout', authController.getLogout);
// router.post('/login', authController.loginPost);
router.get('/data',testController.getData);


module.exports = router;