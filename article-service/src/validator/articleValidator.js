const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ArticleValidator {
  async articleCreateValidator(req, res, next) {
    const schema = Joi.object({
      slug: Joi.string().max(255).required(),
      status: Joi.string().valid('draft','scheduled','published').optional(),
      scheduled_at: Joi.date().optional(),
      published_at: Joi.date().optional(),
      author_id: Joi.number().integer().optional(),
      secret_key: Joi.string().max(255).optional(),
      must_be_logged_in: Joi.boolean().optional(),
      must_be_verified: Joi.boolean().optional(),
      must_be_over_18: Joi.boolean().optional(),
      geo_block_mode: Joi.string().valid('allow','deny').optional(),
      geo_block_countries: Joi.array().items(Joi.string()).optional(),
      metadata: Joi.object().optional(),
    });

    const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const msg = error.details.map(d => d.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, msg));
    }
    req.body = value;
    next();
  }

  async articleUpdateValidator(req, res, next) {
    const schema = Joi.object({
      slug: Joi.string().max(255).optional(),
      status: Joi.string().valid('draft','scheduled','published').optional(),
      scheduled_at: Joi.date().optional(),
      published_at: Joi.date().optional(),
      author_id: Joi.number().integer().optional(),
      secret_key: Joi.string().max(255).optional(),
      must_be_logged_in: Joi.boolean().optional(),
      must_be_verified: Joi.boolean().optional(),
      must_be_over_18: Joi.boolean().optional(),
      geo_block_mode: Joi.string().valid('allow','deny').optional(),
      geo_block_countries: Joi.array().items(Joi.string()).optional(),
      metadata: Joi.object().optional(),
    });

    const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const msg = error.details.map(d => d.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, msg));
    }
    req.body = value;
    next();
  }
}

module.exports = new ArticleValidator();