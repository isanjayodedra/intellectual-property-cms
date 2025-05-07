const SuperDao = require('./SuperDao');
const { ArticleTranslation } = require('../models');

class ArticleTranslationDao extends SuperDao {
  constructor() {
    super(ArticleTranslation);
  }

  async findByArticle(articleId) {
    return this.model.findAll({ where: { article_id: articleId } });
  }

}

module.exports = ArticleTranslationDao;