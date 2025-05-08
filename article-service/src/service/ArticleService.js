const httpStatus        = require('http-status');
const { v4: uuidv4 }    = require('uuid');
const ArticleDao        = require('../dao/ArticleDao');
const responseHandler   = require('../helper/responseHandler');
const logger            = require('../config/logger');
const { articleConstant } = require('../config/constant');

class ArticleService {
  constructor() {
    this.articleDao = new ArticleDao();
  }

  /**
   * Create a new article
   * @param {Object} articleBody
   * @returns {Object}
   */
  createArticle = async (articleBody) => {
    try {
      // enforce unique slug
      if (articleBody.slug && await this.articleDao.findBySlug(articleBody.slug)) {
        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Slug already taken');
      }
      articleBody.slug = articleBody.slug || uuidv4();
      articleBody.status = articleBody.status || articleConstant.STATUS_DRAFT;

      const article = await this.articleDao.create(articleBody);
      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        'Article created successfully',
        article.toJSON()
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to create article');
    }
  };

  /**
   * Check if a slug exists
   * @param {String} slug
   */
  isSlugExists = async (slug) => {
    if (!await this.articleDao.findBySlug(slug)) {
      return responseHandler.returnError(httpStatus.NOT_FOUND, 'Slug not found');
    }
    return responseHandler.returnSuccess(httpStatus.OK, 'Slug exists');
  };

  /**
   * List all published articles
   */
  listPublished = async (page = 1, size = 10) => {
    try {
      const limit  = Math.max(1, parseInt(size, 10));
      const offset = (Math.max(1, parseInt(page, 10)) - 1) * limit;

      const { count: totalDocs, rows: articles } = await this.articleDao.findAndCountPublished({ limit, offset });
      const totalPages = Math.ceil(totalDocs / limit);

      return responseHandler.returnSuccess(
        httpStatus.OK,
        'Published articles fetched',
        { articles, totalDocs, totalPages, page: Number(page), limit }
      );
    } catch (err) {
      logger.error(err);
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Could not fetch paginated articles'
      );
    }
  };
  
  /**
   * Get one article by ID
   * @param {Number} id
   */
  getArticleById = async (id) => {
    try {
      const art = await this.articleDao.findById(id);
      if (!art) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'Article not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'Article fetched', art);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching article');
    }
  };

  /**
   * Update an article
   * @param {Number} id
   * @param {Object} updateBody
   */
  updateArticle = async (id, updateBody) => {
    try {
      const updated = await this.articleDao.update(id, updateBody);
      return responseHandler.returnSuccess(httpStatus.OK, 'Article updated', updated);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to update article');
    }
  };

  /**
   * Delete an article
   * @param {Number} id
   */
  deleteArticle = async (id) => {
    try {
      await this.articleDao.delete(id);
      return responseHandler.returnSuccess(httpStatus.NO_CONTENT, 'Article deleted', {});
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to delete article');
    }
  };
}

module.exports = ArticleService;