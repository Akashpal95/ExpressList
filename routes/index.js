const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
router.use(express.urlencoded());
console.log('Router Loaded');

router.get('/', homeController.home);
router.post('/add-task', homeController.createNewTask);

module.exports = router;