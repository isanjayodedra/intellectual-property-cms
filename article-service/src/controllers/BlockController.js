const httpStatus     = require('http-status');
const BlockService   = require('../service/BlockService');
const responseHandler= require('../helper/responseHandler');
const logger         = require('../config/logger');

class BlockController {
  constructor() {
    this.service = new BlockService();
  }

  create = async (req, res) => {
    try {
      const result = await this.service.createBlock(req.body);
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

  update = async (req, res) => {
    try {
      const result = await this.service.updateBlock(req.params.id, req.body);
      const { status, message, data } = result;
      res.status(status).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  remove = async (req, res) => {
    try {
      const result = await this.service.deleteBlock(req.params.id);
      const { status, message } = result;
      res.status(status).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = BlockController;