import Joi from '@hapi/joi';

export const roleValSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required()
});
