const cron = require('node-cron');
// schedule tasks to be run on the server
cron.schedule('* * * * *', () => {
    console.log('Execute your common-service cron service here...');
});
