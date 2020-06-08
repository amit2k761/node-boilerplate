import chalk from 'chalk';
import figlet from 'figlet';
import Inquirer from './inquirer';

class Schematics {
  constructor() {
    console.log(
      chalk.yellow(figlet.textSync('NODE', { horizontalLayout: 'full' }))
    );

    new Inquirer();
  }
}

export default Schematics;
