import mongoose from 'mongoose';
import profileConstants from '../../../constants/profile-constant';

const ProfileSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: profileConstants.gender,
    default: 'male'
  },
  location: String,
  profile_pic_url: String
});

export default ProfileSchema;
