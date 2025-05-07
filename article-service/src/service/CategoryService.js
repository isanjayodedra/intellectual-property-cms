const httpStatus        = require('http-status');
const CategoryDao       = require('../dao/CategoryDao');
const responseHandler   = require('../helper/responseHandler');
const logger            = require('../config/logger');
const { categoryConstant } = require('../config/constant');

class CategoryService {
  constructor() {
    this.dao = new CategoryDao();
  }

  createCategory = async (body) => {
    try {
      if (await this.dao.findBySlug(body.slug)) {
        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Slug already taken');
      }
      body.slug = body.slug;
      body.is_active = body.is_active ?? categoryConstant.DEFAULT_ACTIVE;

      const cat = await this.dao.create(body);
      return responseHandler.returnSuccess(httpStatus.CREATED, 'Category created', cat);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to create category');
    }
  };

  listAll = async () => {
    try {
      const list = await this.dao.findAll();
      return responseHandler.returnSuccess(httpStatus.OK, 'Categories fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch categories');
    }
  };

  listActive = async () => {
    try {
      const list = await this.dao.findAllActive();
      return responseHandler.returnSuccess(httpStatus.OK, 'Active categories fetched', list);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch active categories');
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.findById(id);
      if (!item) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'Category not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'Category fetched', item);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching category');
    }
  };

  getBySlug = async (slug) => {
    try {
      const item = await this.dao.findBySlug(slug);
      if (!item) {
        return responseHandler.returnError(httpStatus.NOT_FOUND, 'Category not found');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'Category fetched', item);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching category');
    }
  };

  updateCategory = async (id, body) => {
    try {
      const updated = await this.dao.update(id, body);
      return responseHandler.returnSuccess(httpStatus.OK, 'Category updated', updated);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to update category');
    }
  };

  deleteCategory = async (id) => {
    try {
      await this.dao.delete(id);
      return responseHandler.returnSuccess(httpStatus.NO_CONTENT, 'Category deleted', {});
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Failed to delete category');
    }
  };
}

module.exports = CategoryService;