import HttpException from './http-exception';
import Joi from '@hapi/joi';

export default  (req, valSchema,type) => {
  try {
    const { error, value, warning } = type ? Joi.array().items(valSchema).min(1).required().validate(req.body):valSchema.validate(req.body);
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
