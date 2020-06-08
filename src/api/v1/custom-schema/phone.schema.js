import mongoose from 'mongoose';
import countries from '../../../constants/countries';

const PhoneSchema = new mongoose.Schema({
  country_code: {
    type: String,
    enum: [...Object.keys(countries)],
    default: '+91'
  },
  number: { type: String }
});

export default PhoneSchema;
