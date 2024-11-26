const express = require('express');

const userControllers = require('../controllers/userControllers.js')

const protectRoute = require('../middlewares/protectRoutes')

const router = express.Router();

router.get("/", protectRoute, userControllers.getUsersForSidebar);

module.exports = router;