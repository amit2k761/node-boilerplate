import inquirer from 'inquirer';
import { Spinner } from 'clui';
import { File } from './files';
import { resolve } from 'dns';
import chalk from 'chalk';

const questions = {
  database:{
    type: 'list',
    name: 'database',
    message: 'Which database you want to configure',
    choices: ['mongoose','sqlize']
  },
  operation: {
    type: 'list',
    name: 'operation',
    message: 'What you would like to create?',
    choices: ['Resource', 'Utility']
  },
  resourceName: {
    type: 'input',
    name: 'resource',
    message: 'Enter resource name'
  }
};
const resourceSpinner = new Spinner(
  chalk.blue('Hold on! Creating Resource ...'),
  ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
);

const fileSpinner = new Spinner(chalk.blue('Generating files. Please wait !'), [
  '⣾',
  '⣽',
  '⣻',
  '⢿',
  '⡿',
  '⣟',
  '⣯',
  '⣷'
]);

async function spinnerInterval(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export default class Inquirer {
  constructor() {
    this.askOperation();
  }

  async askOperation() {
    let dbDetails = await inquirer.prompt(questions.database);
    await inquirer.prompt(questions.operation).then(answers => {
      switch (answers.operation) {
        case 'Resource': {
          this.askForResourceName(dbDetails.database);
          break;
        }
        case 'Utility': {
          console.log(
            chalk.blue('Dont be lazy. Make some of your own templates')
          );
          process.exit(0);
          break;
        }
      }
    });
  }

  askForResourceName(database) {
    inquirer.prompt(questions.resourceName).then(async ({ resource }) => {
      if (!resource) {
        return;
      }
      resourceSpinner.start();
      await spinnerInterval(4000);
      resourceSpinner.stop();
      fileSpinner.start();
      await spinnerInterval(2000);
      await new File().generateResource(resource,database);
      fileSpinner.stop();

      process.exit(0);
    });
  }

  async askDatabase() {
    await inquirer.prompt(questions.operation).then(answers => {
      switch (answers.operation) {
        case 'Resource': {
          this.askForResourceName();
          break;
        }
        case 'Utility': {
          console.log(
            chalk.blue('Dont be lazy. Make some of your own templates')
          );
          process.exit(0);
          break;
        }
      }
    });
  }

}
