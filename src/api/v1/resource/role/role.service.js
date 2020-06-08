import DefaultService from '../../../../lib/default-service';
import Role from './role.model';

export class RoleService extends DefaultService {
  constructor() {
    super();
  }

  getAllRoles = async () => {
    return Role.find({});
  };

  getRole = async obj => {
    return Role.findOne(obj);
  };

  createRole = async roleObj => {
    let role = await Role.findOne({ name: roleObj.name });

    if (role) {
      throw {
        statusCode: this.appConstants.http_codes.already_exists,
        message: 'Role already exists'
      };
    }

    role = new Role(roleObj);
    role = await role.save();

    return role;
  };

  getDefaultRole = async () => {
    let { _id: roleId } = await this.getRole({ type: 'public' });

    if (!roleId) {
      throw new Error('Unable to find default role');
    }
    return roleId;
  };

  getAuthenticatedRole = async () => {
    let { _id: roleId } = await this.getRole({ type: 'authenticated' });

    if (!roleId) {
      throw new Error('Unable to find default role');
    }
    return roleId;
  };

  checkRoleAccess = async (roleId, rolesAllowed = []) => {
    if (!rolesAllowed.length) {
      return false;
    }

    const roleIdToCheck = roleId.toString();
    const roles = await Role.find({ type: { $in: rolesAllowed } });

    return roles.map(role => role.id).includes(roleIdToCheck) ? true : false;
  };

  getSuperAdminRole = async () => {
    return Role.findOne({ name: 'super-admin' });
  };
}

export default new RoleService();
