const SuperDao = require('./SuperDao');
const { ArticleCategory } = require('../models');

class ArticleCategoryDao extends SuperDao {
  constructor() {
    super(ArticleCategory);
  }

  async findByArticle(articleId) {
    return this.model.findAll({ where: { article_id: articleId } });
  }

}

module.exports = ArticleCategoryDao;