const httpStatus              = require('http-status');
const ArticleTranslationDao   = require('../dao/ArticleTranslationDao');
const responseHandler         = require('../helper/responseHandler');
const logger                  = require('../config/logger');

class ArticleTranslationService {
  constructor() {
    this.dao = new ArticleTranslationDao();
  }

  /**
   * Create a translation
   */
  createTranslation = async (body) => {
    try {
      const tr = await this.dao.create(body);
      return responseHandler.returnSuccess(httpStatus.CREATED, 'Translation created', tr);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to create translation');
    }
  };

  /**
   * List all translations
   */
  listAll = async () => {
    try {
      const list = await this.dao.findAll();
      return responseHandler.returnSuccess(httpStatus.OK, 'Translations fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch translations');
    }
  };

  /**
   * Get translation by ID
   */
  getById = async (id) => {
    try {
      const item = await this.dao.findById(id);
      if (!item) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'Translation not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'Translation fetched', item);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching translation');
    }
  };

  /**
   * List translations for an article
   */
  listByArticle = async (articleId) => {
    try {
      const list = await this.dao.findByArticle(articleId);
      return responseHandler.returnSuccess(httpStatus.OK, 'Article translations fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch translations');
    }
  };

  /**
   * Update a translation
   */
  updateTranslation = async (id, body) => {
    try {
      const updated = await this.dao.update(id, body);
      return responseHandler.returnSuccess(httpStatus.OK, 'Translation updated', updated);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to update translation');
    }
  };

  /**
   * Delete a translation
   */
  deleteTranslation = async (id) => {
    try {
      await this.dao.delete(id);
      return responseHandler.returnSuccess(httpStatus.NO_CONTENT, 'Translation deleted', {});
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to delete translation');
    }
  };
}

module.exports = ArticleTranslationService;