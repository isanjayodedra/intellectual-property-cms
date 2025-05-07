const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ArticleTranslationValidator {
  async createValidator(req, res, next) {
    const schema = Joi.object({
      article_id: Joi.number().integer().required(),
      language_code: Joi.string().max(5).required(),
      title: Joi.string().max(500).required(),
      description: Joi.string().optional(),
      locale: Joi.string().max(10).optional(),
      sponsor_name: Joi.string().max(255).optional(),
      sponsor_logo_url: Joi.string().uri().optional(),
      sponsor_url: Joi.string().uri().optional(),
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
      language_code: Joi.string().max(5).optional(),
      title: Joi.string().max(500).optional(),
      description: Joi.string().optional(),
      locale: Joi.string().max(10).optional(),
      sponsor_name: Joi.string().max(255).optional(),
      sponsor_logo_url: Joi.string().uri().optional(),
      sponsor_url: Joi.string().uri().optional(),
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

module.exports = new ArticleTranslationValidator();