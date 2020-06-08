import { roleValSchema } from './role.validator';
import roleService from './role.service';
import DefaultController from '../../../../lib/default-controller';

export class RoleController extends DefaultController {
  constructor() {
    super();
  }

  getRoles = async (req, res, next) => {
    try {
      const roles = await roleService.getAllRoles();

      if (!roles.length) {
        return this.sendResponse(res, this.appConstants.http_codes.not_found);
      }

      return this.sendResponse(
        res,
        this.appConstants.http_codes.success,
        roles
      );
    } catch (error) {
      next(this.handleError(error));
    }
  };

  createRole = async (req, res, next) => {
    try {
      const { errorMessage, value } = this.handleValidationError(
        req,
        roleValSchema
      );

      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const role = await roleService.createRole(value);

      if (!role) {
        throw new Error(
          this.appConstants.messsages.resources.role.error.role_not_created
        );
      }

      return this.sendResponse(res, this.appConstants.http_codes.created, role);
    } catch (error) {
      next(this.handleError(error));
    }
  };
}

export default new RoleController();
