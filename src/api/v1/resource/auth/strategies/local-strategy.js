import passport from 'passport';
import { Strategy } from 'passport-local';

export default async function localStrategy() {
  passport.use(
    new Strategy({
      usernameField: username,
      passwordField: password
    }),
    (username, password, done) => {}
  );
}
