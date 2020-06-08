import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema(
  {
    device_token: {
      type: String,
      trim: true
    },
    device_type: {
      type: String,
      trim: true
    },
    device_id: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

export default DeviceSchema;
