import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';
import Crypto from 'crypto';
import configs from '../../../../config/index';
import UserSchema from './user.schema';
import appConstants from '../../../../constants/app-constant';

UserSchema.statics.findByPhoneNo = async function(phoneObj) {
  return this.findOne({
    country_code: phoneObj.country_code,
    number: phoneObj.number
  }).exec();
};

UserSchema.methods.generateOtp = async function() {
  this.otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
  await this.save();
  return this.otp;
};

UserSchema.methods.hashPassword = async function() {
  const salt = await Bcrypt.genSalt(configs.bcrypt_salt_work_factor);

  const hash = await Bcrypt.hash(this.password, salt);

  this.password = hash;

  return this;
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await Bcrypt.compare(candidatePassword, this.password);

  return isMatch;

  // if (isMatch) {
  //     return this
  // }

  // return new Error(appConstants.messsages.resources.user.error.incorrect_password)
};

export default mongoose.model('user', UserSchema);
