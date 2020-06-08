import mongoose, { Schema } from 'mongoose';
import appConstant from '../../../../constants/app-constant';
import countries from '../../../../constants/countries';

import ProfileSchema from '../../custom-schema/profile.schema';
import DeviceSchema from '../../custom-schema/device.schema';
import NotificationSchema from '../../custom-schema/notification.schema';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      sparse: true
    },
    password: {
      type: String,
      trim: true
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'role',
      required: [
        true,
        appConstant.messsages.resources.user.validation.role_required
      ]
    },
    social_id: {
      type: String,
      sparse: true
    },
    provider: {
      type: String,
      required: [
        true,
        appConstant.messsages.resources.user.validation.provider_required
      ],
      enum: ['local', 'google', 'facebook', 'apple', 'phone']
    },
    is_email_verified: {
      type: Boolean,
      default: false
    },
    otp: String,
    blocked: {
      type: Boolean,
      default: false
    },
    password_reset_token: String,
    profile: { type: ProfileSchema, default: ProfileSchema },
    country_code: {
      type: String,
      enum: [...Object.keys(countries)],
      default: '+91'
    },
    number: { type: String },
    devices: [DeviceSchema],
    notifications: [NotificationSchema]
  },
  { timestamps: true, strict: true }
);

UserSchema.index({ country_code: 1, number: -1 }, { unique: true });

export default UserSchema;
