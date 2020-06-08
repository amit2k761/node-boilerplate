import Joi from '@hapi/joi';
import profileConstants from '../../../../constants/profile-constant';

export const userValSchemaForRegister = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required(),
  password: Joi.string().required()
});
