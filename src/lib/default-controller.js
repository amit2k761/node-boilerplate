import HttpException from '../utils/http-exception';
import handleValidationError from '../utils/handle-validation-error';
import sendResponse from '../utils/send-response';
import appConstants from '../constants/app-constant';
import { clearHash } from '../pre-server/cache';

export default class DefaultController {
  constructor() {
    this._appConstants = appConstants;
  }

  handleError(error = {}) {
    const statusCode = error.statusCode || 400;
    const message = error.message || '';

    return new HttpException(statusCode, message, error);
  }

  handleValidationError(req, modelValSchema) {
    return handleValidationError(req, modelValSchema);
  }

  sendResponse(res, statusCode, data) {
    return sendResponse(res, statusCode, data);
  }

  success(res, data){
    return sendResponse(res, this.appConstants.http_codes.success, data);
  }

  created(res,data){
    return sendResponse(res,this.appConstants.http_codes.created, data);
  }

  noContent(res){
    return sendResponse(res,this.appConstants.http_codes.no_content);
  }

  clearCache(key) {
    clearHash(key);
  }

  get appConstants() {
    return this._appConstants;
  }
}
