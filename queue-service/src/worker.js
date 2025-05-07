const { Worker } = require('bullmq');
const redisClient = require('./config/redis');

// Process email jobs
new Worker('emailQueue', async job => {
  console.log(`Processing job ${job.id}:`, job.data);
  // TODO: integrate real email-sending logic here
}, { connection: redisClient });

console.log('Queue worker started');
