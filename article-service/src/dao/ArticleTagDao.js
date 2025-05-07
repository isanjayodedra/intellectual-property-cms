const SuperDao = require('./SuperDao');
const { ArticleTag } = require('../models');

class ArticleTagDao extends SuperDao {
  constructor() {
    super(ArticleTag);
  }

  async findByArticle(articleId) {
    return this.model.findAll({ where: { article_id: articleId } });
  }

}

module.exports = ArticleTagDao;