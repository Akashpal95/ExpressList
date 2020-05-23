const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
router.use(express.urlencoded());
console.log('Router Loaded');
//router for home
router.get('/', homeController.home);
//router for add/delete
router.post('/add-task', homeController.actionTask);

module.exports = router;