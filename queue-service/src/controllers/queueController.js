const QueueService = require('../services/queueService');

class QueueController {
  static async enqueueEmail(req, res, next) {
    try {
      console.log('Request by user:', req.headers['x-user-id']);
      const job = await QueueService.addEmailJob({ ...req.body, requestedBy: req.headers['x-user-id'] });
      res.status(201).json({ jobId: job.id, status: job.name });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QueueController;
