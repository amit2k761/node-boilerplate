import crons from '../crons/';

class CronJobs {
  /**
   * @params ${jobs} To retrieve all cron jobs
   */
  constructor() {
    this.jobs = this._getCronJobs();
  }

  _getCronJobs() {
    return crons();
  }

  preCronJobHook() {}
  postCronJobHook() {}

  /**
   * @description To start cron jobs.
   * To modify or remove a particular cron job.Use pre/post hook
   */

  startCronJobs() {
    this.preCronJobHook();

    Object.keys(this.jobs)
      .map(cronJobName => this.jobs[cronJobName])
      .flat()
      .forEach(job => {
        job.start();
      });

    this.postCronJobHook();
  }
}

export default CronJobs;
