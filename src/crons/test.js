import cron from 'cron';

const CronJob = cron.CronJob;

const testJob = new CronJob('* * * * * *', function() {
  console.log('testing job');
});

export default testJob;
