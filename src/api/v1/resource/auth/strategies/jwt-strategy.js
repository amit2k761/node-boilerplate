import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../../../../config';
import User from '../../user/user.model';

class JwtStrategy {
  constructor() {
    this._initOpts();
  }

  _initOpts() {
    this._opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secrets.jwt,
      jsonWebTokenOptions: {
        expiresIn: config.secrets.jwtExp
      }
    };
  }

  jwtStrategy = async passport => {
    passport.use(
      new Strategy(this._opts, async (jwt_payload, done) => {
        try {
          const user = await User.findById(jwt_payload._id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      })
    );
  };
}

export default new JwtStrategy().jwtStrategy;
