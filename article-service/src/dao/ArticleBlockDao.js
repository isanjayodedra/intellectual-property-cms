const SuperDao = require('./SuperDao');
const { ArticleBlock } = require('../models');

class ArticleBlockDao extends SuperDao {
  constructor() {
    super(ArticleBlock);
  }

  async findByArticle(articleId) {
    return this.model.findAll({ where: { article_id: articleId } });
  }

}

module.exports = ArticleBlockDao;