const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/', homeController.getHome);

router.get('/get-user', homeController.getUsers);

router.post('/add-user', homeController.addUsers);

module.exports = router;
