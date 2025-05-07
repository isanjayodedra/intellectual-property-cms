// src/controllers/ArticleController.js

const httpStatus       = require('http-status');
const ArticleService   = require('../service/ArticleService');
const logger           = require('../config/logger');

class ArticleController {
  constructor() {
    this.articleService = new ArticleService();
  }

  /**
   * POST /api/articles
   */
  create = async (req, res) => {
    try {
      const result = await this.articleService.createArticle(req.body);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  /**
   * GET /api/articles
   */
  listPublished = async (req, res) => {
    try {
      const { response, statusCode } = await this.articleService.listPublished();
      // now response === { status, code, message, data }
    const { status, message, data } = response;
      res.status(statusCode).json({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  /**
   * GET /api/articles/:id
   */
  getById = async (req, res) => {
    try {
      const result = await this.articleService.getArticleById(req.params.id);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  /**
   * PUT /api/articles/:id
   */
  update = async (req, res) => {
    try {
      const result = await this.articleService.updateArticle(req.params.id, req.body);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  /**
   * DELETE /api/articles/:id
   */
  remove = async (req, res) => {
    try {
      const result = await this.articleService.deleteArticle(req.params.id);
      const { status, message } = result;
      // no content payload on deletion
      res.status(status).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  /**
   * GET /api/articles/slug/:slug
   */
  checkSlug = async (req, res) => {
    try {
      const result = await this.articleService.isSlugExists(req.params.slug);
      const { status, message } = result;
      res.status(status).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = ArticleController;