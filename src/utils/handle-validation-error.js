import HttpException from './http-exception';

export default (req, valSchema) => {
  try {
    const { error, value, warning } = valSchema.validate(req.body);

    if (!error) return { errorMessage: '', value };

    const errorMessage =
      error.details &&
      error.details.length > 0 &&
      error.details[0].message.toString();

    return { errorMessage, value };
  } catch (error) {
    throw new Error(error);
  }
};
