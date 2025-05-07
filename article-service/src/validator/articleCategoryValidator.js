const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class ArticleCategoryValidator {
  async createValidator(req, res, next) {
    const schema = Joi.object({
      article_id: Joi.number().integer().required(),
      category_id: Joi.number().integer().required()
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

module.exports = new ArticleCategoryValidator();