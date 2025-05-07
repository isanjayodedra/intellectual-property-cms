const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ArticleBlockValidator {
  async createValidator(req, res, next) {
    const schema = Joi.object({
      article_id: Joi.number().integer().required(),
      block_id: Joi.number().integer().required(),
      language_code: Joi.string().max(5).optional(),
      title: Joi.string().max(255).optional(),
      block_type: Joi.string().max(50).optional(),
      content: Joi.object().required(),
      sort_order: Joi.number().integer().optional(),
      created_by: Joi.number().integer().optional(),
      updated_by: Joi.number().integer().optional(),
      version: Joi.number().integer().optional(),
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
      title: Joi.string().max(255).optional(),
      content: Joi.object().optional(),
      sort_order: Joi.number().integer().optional(),
      updated_by: Joi.number().integer().optional(),
      version: Joi.number().integer().optional(),
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

module.exports = new ArticleBlockValidator();