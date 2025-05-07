const httpStatus      = require('http-status');
const BlockDao        = require('../dao/BlockDao');
const responseHandler = require('../helper/responseHandler');
const logger          = require('../config/logger');

class BlockService {
  constructor() {
    this.dao = new BlockDao();
  }

  /**
   * Create a block
   */
  createBlock = async (body) => {
    try {
      const blk = await this.dao.create(body);
      return responseHandler.returnSuccess(httpStatus.CREATED, 'Block created', blk);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to create block');
    }
  };

  /**
   * List all blocks
   */
  listAll = async () => {
    try {
      const list = await this.dao.findAll();
      return responseHandler.returnSuccess(httpStatus.OK, 'Blocks fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch blocks');
    }
  };

  /**
   * List only active blocks
   */
  listActive = async () => {
    try {
      const list = await this.dao.findActive();
      return responseHandler.returnSuccess(httpStatus.OK, 'Active blocks fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch active blocks');
    }
  };

  /**
   * Get a block by ID
   */
  getBlockById = async (id) => {
    try {
      const blk = await this.dao.findById(id);
      if (!blk) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'Block not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'Block fetched', blk);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching block');
    }
  };

  /**
   * Update a block
   */
  updateBlock = async (id, body) => {
    try {
      const updated = await this.dao.update(id, body);
      return responseHandler.returnSuccess(httpStatus.OK, 'Block updated', updated);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to update block');
    }
  };

  /**
   * Delete a block
   */
  deleteBlock = async (id) => {
    try {
      await this.dao.delete(id);
      return responseHandler.returnSuccess(httpStatus.NO_CONTENT, 'Block deleted', {});
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to delete block');
    }
  };
}

module.exports = BlockService;