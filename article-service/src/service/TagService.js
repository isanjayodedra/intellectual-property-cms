const httpStatus      = require('http-status');
const TagDao          = require('../dao/TagDao');
const responseHandler = require('../helper/responseHandler');
const logger          = require('../config/logger');
const { tagConstant } = require('../config/constant');

class TagService {
  constructor() {
    this.dao = new TagDao();
  }

  createTag = async (body) => {
    try {
      if (await this.dao.findBySlug(body.slug)) {
        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Slug already taken');
      }
      body.slug = body.slug;
      body.is_active = body.is_active ?? tagConstant.DEFAULT_ACTIVE;

      const tag = await this.dao.create(body);
      return responseHandler.returnSuccess(httpStatus.CREATED, 'Tag created', tag);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to create tag');
    }
  };

  listAll = async () => {
    try {
      const list = await this.dao.findAll();
      return responseHandler.returnSuccess(httpStatus.OK, 'Tags fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch tags');
    }
  };

  listActive = async () => {
    try {
      const list = await this.dao.findAllActive();
      return responseHandler.returnSuccess(httpStatus.OK, 'Active tags fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch active tags');
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.findById(id);
      if (!item) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'Tag not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'Tag fetched', item);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching tag');
    }
  };

  getBySlug = async (slug) => {
    try {
      const item = await this.dao.findBySlug(slug);
      if (!item) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'Tag not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'Tag fetched', item);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching tag');
    }
  };

  updateTag = async (id, body) => {
    try {
      const updated = await this.dao.update(id, body);
      return responseHandler.returnSuccess(httpStatus.OK, 'Tag updated', updated);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to update tag');
    }
  };

  deleteTag = async (id) => {
    try {
      await this.dao.delete(id);
      return responseHandler.returnSuccess(httpStatus.NO_CONTENT, 'Tag deleted', {});
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to delete tag');
    }
  };
}

module.exports = TagService;