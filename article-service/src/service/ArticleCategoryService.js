const httpStatus              = require('http-status');
const ArticleCategoryDao      = require('../dao/ArticleCategoryDao');
const responseHandler         = require('../helper/responseHandler');
const logger                  = require('../config/logger');

class ArticleCategoryService {
  constructor() {
    this.dao = new ArticleCategoryDao();
  }

  createAssociation = async (body) => {
    try {
      const ac = await this.dao.create(body);
      return responseHandler.returnSuccess(httpStatus.CREATED, 'Association created', ac);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to create association');
    }
  };

  listAll = async () => {
    try {
      const list = await this.dao.findAll();
      return responseHandler.returnSuccess(httpStatus.OK, 'Associations fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch associations');
    }
  };

  listByArticle = async (articleId) => {
    try {
      const list = await this.dao.findByArticle(articleId);
      return responseHandler.returnSuccess(httpStatus.OK, 'Associations for article fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch associations');
    }
  };

  deleteAssociation = async (id) => {
    try {
      await this.dao.delete(id);
      return responseHandler.returnSuccess(httpStatus.NO_CONTENT, 'Association deleted', {});
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to delete association');
    }
  };
}

module.exports = ArticleCategoryService;