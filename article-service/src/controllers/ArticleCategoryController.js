const httpStatus            = require('http-status');
const ArticleCategoryService= require('../service/ArticleCategoryService');
const responseHandler       = require('../helper/responseHandler');
const logger                = require('../config/logger');

class ArticleCategoryController {
  constructor() {
    this.service = new ArticleCategoryService();
  }

  create = async (req, res) => {
    try {
      const result = await this.service.createAssociation(req.body);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  listAll = async (req, res) => {
    try {
      const result = await this.service.listAll();
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

  remove = async (req, res) => {
    try {
      const result = await this.service.deleteAssociation(req.params.id);
      const { status, message } = result;
      res.status(status).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = ArticleCategoryController;