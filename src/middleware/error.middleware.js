import logger from '../utils/logger';
export const errorHandler = (error, request, response, next) => {
  const status = error.statusCode || 500;
  const message =
    error.message || "It's not you. It's us. We are having some problems.";

  logger.error(logger.combinedFormat(error, request, response));

  response.status(status).send({ error: message });
};
