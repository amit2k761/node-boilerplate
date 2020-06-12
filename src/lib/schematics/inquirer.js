import inquirer from 'inquirer';
import { Spinner } from 'clui';
import { File } from './files';
import { resolve } from 'dns';
import chalk from 'chalk';

const questions = {
  orm: {
    type: 'list',
    name: 'orm',
    message: 'Which orm you want to configure?',
    choices: ['Mongoose', 'Sequelize']
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
  },
  relationalDatabase: {
    type: 'list',
    name: 'relationalDatabase',
    message: 'Which relational database you want to use?',
    choices: ['psql', 'mysql']
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
    // let dbDetails = await inquirer.prompt(questions.database);
    inquirer.prompt(questions.operation).then(answers => {
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

  askForResourceName() {
    inquirer.prompt(questions.resourceName).then(async ({ resource }) => {
      if (!resource) {
        return;
      }

      const orm = await this.askForOrm();

      resourceSpinner.start();
      await spinnerInterval(4000);
      resourceSpinner.stop();
      fileSpinner.start();
      await spinnerInterval(2000);
      await new File().generateResource(resource, orm);
      fileSpinner.stop();

      process.exit(0);
    });
  }

  async askForOrm() {
    let answers = await inquirer.prompt(questions.orm);

    switch (answers.orm) {
      case 'Mongoose': {
        return 'Mongoose';
      }
      case 'Sequelize': {
        // ask for relational database question in future
        return 'Sequelize';
      }
    }
  }
}
