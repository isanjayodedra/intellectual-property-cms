const SuperDao = require('./SuperDao');
const { Tag } = require('../models');

class TagDao extends SuperDao {
  constructor() {
    super(Tag);
  }

  async findAllActive() {
    return this.model.findAll({ where: { is_active: true } });
  }

  async findBySlug(slug) {
    return this.model.findOne({ where: { slug } });
  }

}

module.exports = TagDao;