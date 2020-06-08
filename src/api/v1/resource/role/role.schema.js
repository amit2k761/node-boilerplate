import mongoose from 'mongoose';
import appConstant from '../../../../constants/app-constant';

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        appConstant.messsages.resources.role.validation.name_required
      ]
    },
    description: {
      type: String,
      required: [
        true,
        appConstant.messsages.resources.role.validation.description_required
      ]
    },
    type: {
      type: String,
      required: true,
      unique: [
        true,
        appConstant.messsages.resources.role.validation.type_required
      ]
    }
  },
  { timestamps: true, strict: true }
);

export default RoleSchema;
