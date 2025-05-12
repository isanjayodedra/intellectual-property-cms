const SuperDao = require('./SuperDao');
const db       = require('../models');
// console.log('🛠️ Available DB models:', Object.keys(db));
const logger   = require('../config/logger');    // ← ADD THIS LINE

const { Article, ArticleTranslation, ArticleBlock, Category, Tag } = db;

class ArticleDao extends SuperDao {
  constructor() {
    super(Article);
  }

  /**
   * Paginated & filtered fetch
   * @param {Object} opts
   * @param {number} opts.limit    number per page
   * @param {number} opts.offset   skip count
   */
  async findAndCountPublished({ limit, offset }) {
    return this.Model.findAndCountAll({
      where: { status: 'published' },
      include: [
        { model: ArticleTranslation, as: 'ArticleTranslations' },
        { model: ArticleBlock,       as: 'ArticleBlocks' },
        { model: Category,           through: 'ArticleCategory' },
        { model: Tag,                through: 'ArticleTag' },
      ],
      distinct: true,      // ← tell Sequelize to COUNT(DISTINCT primary key)
      col: 'id',           // ← count distinct Article.id
      limit,
      offset,
      order: [['published_at', 'DESC']],
    });
  }

  async findAllPublished() {
    try{
      const publishArticle = await Article.findAll({
        where: { status: 'published' },
        include: [
          { model: ArticleTranslation, as: 'ArticleTranslations' },
          { model: ArticleBlock, as: 'ArticleBlocks' },
          { model: Category, through: 'ArticleCategory' },
          { model: Tag,      through: 'ArticleTag' }
        ]
      });
      return publishArticle;
  } catch (e) {
    logger.error(e);
    return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch articles');
  }
  }

  async findById(id) {
    const ArticleById = await Article.findByPk(9, {
      include: [
        { model: ArticleTranslation, as: 'ArticleTranslations' },
        { model: ArticleBlock, as: 'ArticleBlocks' },
        { model: Category, through: 'ArticleCategory' },
        { model: Tag,      through: 'ArticleTag' }
      ]
    });
    return ArticleById;
  }

  async update(id, data) {
    await Article.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    return Article.destroy({ where: { id } });
  }

  async findBySlug(slug) {
    return Article.findOne({ where: { slug }, paranoid: false });
  }

}

module.exports = ArticleDao;