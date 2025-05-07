const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class TagValidator {
  async createValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().max(255).required(),
      slug: Joi.string().max(255).required(),
      description: Joi.string().optional(),
      is_active: Joi.boolean().optional()
    });
    const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const msg = error.details.map(d=>d.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, msg));
    }
    req.body = value; next();
  }

  async updateValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().max(255).optional(),
      description: Joi.string().optional(),
      is_active: Joi.boolean().optional()
    });
    const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const msg = error.details.map(d=>d.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, msg));
    }
    req.body = value; next();
  }
}

module.exports = new TagValidator();