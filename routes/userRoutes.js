const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create-user', userController.createUser);
router.get('/get-user/:userId', userController.getUserDetails);

module.exports = router;