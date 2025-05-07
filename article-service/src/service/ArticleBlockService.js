const httpStatus          = require('http-status');
const ArticleBlockDao     = require('../dao/ArticleBlockDao');
const responseHandler     = require('../helper/responseHandler');
const logger              = require('../config/logger');

class ArticleBlockService {
  constructor() {
    this.dao = new ArticleBlockDao();
  }

  createBlock = async (body) => {
    try {
      const ab = await this.dao.create(body);
      return responseHandler.returnSuccess(httpStatus.CREATED, 'ArticleBlock created', ab);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to create article-block');
    }
  };

  listAll = async () => {
    try {
      const list = await this.dao.findAll();
      return responseHandler.returnSuccess(httpStatus.OK, 'ArticleBlocks fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch article-blocks');
    }
  };

  listByArticle = async (articleId) => {
    try {
      const list = await this.dao.findByArticle(articleId);
      return responseHandler.returnSuccess(httpStatus.OK, 'Blocks for article fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch blocks for article');
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.findById(id);
      if (!item) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'ArticleBlock not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'ArticleBlock fetched', item);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching article-block');
    }
  };

  updateBlock = async (id, body) => {
    try {
      const updated = await this.dao.update(id, body);
      return responseHandler.returnSuccess(httpStatus.OK, 'ArticleBlock updated', updated);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to update article-block');
    }
  };

  deleteBlock = async (id) => {
    try {
      await this.dao.delete(id);
      return responseHandler.returnSuccess(httpStatus.NO_CONTENT, 'ArticleBlock deleted', {});
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to delete article-block');
    }
  };
}

module.exports = ArticleBlockService;