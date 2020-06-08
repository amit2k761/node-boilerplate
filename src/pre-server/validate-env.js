import { cleanEnv, str, port, email } from 'envalid';
import appConstants from '../constants/app-constant';

/**
 * @description To test and verify the type of environment variables used.
 */

export default () => {
  try {
    cleanEnv(process.env, {
      DATABASE_URL: str(),
      BACKEND_URL: str(),
      NODE_ENV: str(),
      PORT: port(),
      JWT_SECRET: str(),
      JWT_EXPIRATION: str(),
      REDIS_HOST: str(),
      REDIS_PORT: port(),
      MAIL_SERVER_EMAIL_ID: email(),
      MAIL_SERVER_PASSWORD: str()
    });
    console.custom.info(appConstants.messsages.server.success.env_validated);
  } catch (error) {
    console.custom.error(
      appConstants.messsages.server.error.env_validation_failed,
      error
    );
    return error;
  }
};
