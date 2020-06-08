import jwt from 'jsonwebtoken';
import config from '../config/index';

export const createToken = async user => {
  return jwt.sign({ _id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};
