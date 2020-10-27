const express = require('express');
const reactPostController = require('../../controllers/reactPostController/reactPostController');
const authController = require('../../controllers/authController');
const router = express.Router();


router.get('/test-call-api',
    authController.isLoggedIn,
    reactPostController.getPostHome);

module.exports = router;