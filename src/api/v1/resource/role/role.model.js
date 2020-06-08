import mongoose from 'mongoose';
import RoleSchema from './role.schema';

export default mongoose.model('role', RoleSchema);
