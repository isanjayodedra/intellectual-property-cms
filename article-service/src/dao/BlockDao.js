const SuperDao = require('./SuperDao');
const { Block } = require('../models');

class BlockDao extends SuperDao {
  constructor() {
    super(Block);
  }

  async findActive() {
    return this.model.findAll({ where: { is_active: true } });
  }

}

module.exports = BlockDao;