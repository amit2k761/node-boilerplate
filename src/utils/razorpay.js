import Razorpay from 'razorpay';
import config from '../config/index';

const instance = new Razorpay({
  key_id: config.razorpay.key,
  key_secret: config.razorpay.secret
});

export default instance;
