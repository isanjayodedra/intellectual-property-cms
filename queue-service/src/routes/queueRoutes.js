const router = require('express').Router();
const QueueController = require('../controllers/queueController');
const userMiddleware = require('../middleware/userMiddleware');

// Attach user context
router.use(userMiddleware);

// Enqueue email job
router.post('/jobs/email', QueueController.enqueueEmail);

module.exports = router;
