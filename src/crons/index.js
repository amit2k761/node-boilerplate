import path from 'path';
import fs from 'fs';
import appConstants from '../constants/app-constant';

export default () => {
  try {
    let allCrons = {};
    fs.readdirSync(path.join(__dirname))
      .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
      .map(fileName => {
        let cron = require(`../crons/${fileName}`).default;

        if (!allCrons[fileName.split('.js')[0]]) {
          allCrons[fileName.split('.js')[0]] = [];
        }

        if (cron.__proto__.constructor.name === 'CronJob') {
          allCrons[fileName.split('.js')[0]].push(cron);
        } else {
          Object.keys(cron).forEach(item => {
            allCrons[fileName.split('.js')[0]].push(cron[item]);
          });
        }
      });
    return allCrons;
  } catch (error) {
    console.error(
      appConstants.messsages.server.error.global_attaching_error,
      error
    );
  }
};
