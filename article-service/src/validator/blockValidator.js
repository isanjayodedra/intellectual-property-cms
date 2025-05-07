const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class BlockValidator {
  async createValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().max(50).required(),
      label: Joi.string().max(100).required(),
      description: Joi.string().optional(),
      icon: Joi.string().max(100).optional(),
      schema: Joi.object().optional(),
      sort_order: Joi.number().integer().optional(),
      allowed_modules: Joi.array().items(Joi.string()).required(),
      is_active: Joi.boolean().optional(),
      created_by: Joi.number().integer().optional(),
      updated_by: Joi.number().integer().optional(),
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
      label: Joi.string().max(100).optional(),
      description: Joi.string().optional(),
      icon: Joi.string().max(100).optional(),
      schema: Joi.object().optional(),
      sort_order: Joi.number().integer().optional(),
      allowed_modules: Joi.array().items(Joi.string()).optional(),
      is_active: Joi.boolean().optional(),
      updated_by: Joi.number().integer().optional(),
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

module.exports = new BlockValidator();