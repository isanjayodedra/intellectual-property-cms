const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ArticleValidator {
  async articleCreateValidator(req, res, next) {
    const schema = Joi.object({
      slug: Joi.string().required(),
      status: Joi.string().valid('draft', 'scheduled', 'published').required(),
      scheduled_at: Joi.date().optional().allow(null),
      published_at: Joi.date().optional().allow(null),
      secret_key: Joi.string().optional(),
      must_be_logged_in: Joi.boolean().optional(),
      must_be_verified: Joi.boolean().optional(),
      must_be_over_18: Joi.boolean().optional(),
      geo_block_mode: Joi.string().valid('allow', 'deny').optional(),
      geo_block_countries: Joi.array().items(Joi.string()).optional(),
      metadata: Joi.object().optional(),
      translations: Joi.array().items(
        Joi.object({
          language_code: Joi.string().required(),
          title: Joi.string().required(),
          description: Joi.string().optional(),
          locale: Joi.string().optional(),
          sponsor_name: Joi.string().optional(),
          sponsor_logo_url: Joi.string().uri().optional(),
          sponsor_url: Joi.string().uri().optional(),
        })
      ).required(),
      blocks: Joi.array().items(
        Joi.object({
          block_id: Joi.number().required(),
          language_code: Joi.string().required(),
          title: Joi.string().optional(),
          block_type: Joi.string().optional(),
          content: Joi.object().required(),
          sort_order: Joi.number().optional(),
        })
      ).optional(),
      tag_ids: Joi.array().items(Joi.number()).optional(),
      category_ids: Joi.array().items(Joi.number()).optional(),
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