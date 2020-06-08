import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    trim: true
  },
  created_date: {
    type: Schema.Types.Date
  },
  custom: {
    type: Schema.Types.Mixed
  }
});

export default NotificationSchema;
