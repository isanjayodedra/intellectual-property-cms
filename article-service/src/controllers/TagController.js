const httpStatus    = require('http-status');
const TagService    = require('../service/TagService');
const responseHandler = require('../helper/responseHandler');
const logger        = require('../config/logger');

class TagController {
  constructor() {
    this.service = new TagService();
  }

  create = async (req, res) => {
    try {
      const result = await this.service.createTag(req.body);
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

  listActive = async (req, res) => {
    try {
      const result = await this.service.listActive();
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

  getBySlug = async (req, res) => {
    try {
      const result = await this.service.getBySlug(req.params.slug);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const result = await this.service.updateTag(req.params.id, req.body);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  remove = async (req, res) => {
    try {
      const result = await this.service.deleteTag(req.params.id);
      const { status, message } = result;
      res.status(status).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = TagController;