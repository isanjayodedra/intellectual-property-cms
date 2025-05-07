const { Queue } = require('bullmq');
const redisClient = require('../config/redis');

// Instantiate email queue
const emailQueue = new Queue('emailQueue', { connection: redisClient });

class QueueService {
  static async addEmailJob(data) {
    const job = await emailQueue.add('sendEmail', data);
    return job;
  }
}

module.exports = QueueService;
