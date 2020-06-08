export default (res, statusCode = 200, data) => {
  return res.status(statusCode).send({ data });
};
