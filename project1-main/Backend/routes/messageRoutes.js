const express = require('express');

const messageControllers = require('../controllers/messageControllers');

const protectRoute = require('../middlewares/protectRoutes')

const router = express.Router();

router.post('/send/:id', protectRoute, messageControllers.sendMessage);
router.get('/:id', protectRoute, messageControllers.getMessages);

module.exports = router;