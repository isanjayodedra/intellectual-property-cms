const SuperDao = require('./SuperDao');
const { Category } = require('../models');

class CategoryDao extends SuperDao {
  constructor() {
    super(Category);
  }

  async findAllActive() {
    return this.model.findAll({ where: { is_active: true } });
  }

  async findBySlug(slug) {
    return this.model.findOne({ where: { slug } });
  }

}

module.exports = CategoryDao;