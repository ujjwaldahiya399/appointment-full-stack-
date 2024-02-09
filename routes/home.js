const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/home', homeController.getHome);

router.get('/', homeController.getHome);

router.get('/appointments', homeController.getAppointments);

router.post('/appointments', homeController.postAppointments);

module.exports = router;