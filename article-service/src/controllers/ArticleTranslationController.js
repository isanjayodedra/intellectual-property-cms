const httpStatus                    = require('http-status');
const ArticleTranslationService     = require('../service/ArticleTranslationService');
const responseHandler               = require('../helper/responseHandler');
const logger                        = require('../config/logger');

class ArticleTranslationController {
  constructor() {
    this.service = new ArticleTranslationService();
  }

  create = async (req, res) => {
    try {
      const result = await this.service.createTranslation(req.body);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  list = async (req, res) => {
    try {
      const result = await this.service.listAll();
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getById = async (req, res) => {
    try {
      const result = await this.service.getById(req.params.id);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  listByArticle = async (req, res) => {
    try {
      const result = await this.service.listByArticle(req.params.articleId);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const result = await this.service.updateTranslation(req.params.id, req.body);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  remove = async (req, res) => {
    try {
      const result = await this.service.deleteTranslation(req.params.id);
      const { status, message } = result;
      res.status(status).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = ArticleTranslationController;