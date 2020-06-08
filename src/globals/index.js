import path from 'path';
import fs from 'fs';
import appConstants from '../constants/app-constant';

export default () => {
  try {
    fs.readdirSync(path.join(__dirname))
      .filter(file => file.indexOf('.') !== 0 && file !== 'index.ts')
      .map(fileName => {
        require(`../globals/${fileName}`);
      });

    console.custom.info(appConstants.messsages.server.success.globals_attached);
  } catch (error) {
    console.error(
      appConstants.messsages.server.error.global_attaching_error,
      error
    );
  }
};
