/**
 * Authorization  middleware.
 */

import sendResponse from '../utils/send-response';
import roleService from '../api//v1//resource/role/role.service';
import HttpException from '../utils/http-exception';
import appConstants from '../constants/app-constant';
/**
 * @description Authorization middleware
 * @param {*} rolesAllowed Array of roles with role defined as string from role constant file
 */

export default function(rolesAllowed) {
  return async (req, res, next) => {
    const roleId = req.user.role;

    if (!roleId) {
      return sendResponse(
        res,
        appConstants.http_codes.unauthenticated,
        'Unauthenticated'
      );
    }

    const isAllowed = await roleService.checkRoleAccess(roleId, rolesAllowed);

    if (!isAllowed) {
      return sendResponse(
        res,
        appConstants.http_codes.forbidden,
        'Unauthorized'
      );
    }
    //Pass it to next middleware
    next();
  };
}
