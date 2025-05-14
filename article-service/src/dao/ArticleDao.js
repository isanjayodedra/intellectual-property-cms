const SuperDao = require('./SuperDao');
const db       = require('../models');
// console.log('🛠️ Available DB models:', Object.keys(db));
const logger   = require('../config/logger');    // ← ADD THIS LINE

const { Article, ArticleTranslation, ArticleBlock, ArticleTag, ArticleCategory , Category, Tag, sequelize } = db;

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
    const ArticleById = await Article.findByPk(id, {
      include: [
        { model: ArticleTranslation, as: 'ArticleTranslations' },
        { model: ArticleBlock, as: 'ArticleBlocks' },
        { model: Category, through: 'ArticleCategory' },
        { model: Tag,      through: 'ArticleTag' }
      ]
    });
    return ArticleById;
  }

  async create(data, author_id) {
    const transaction = await sequelize.transaction();
    try {
      const { translations, blocks, tag_ids, category_ids, ...articleFields } = data;
      const article = await Article.create({ ...articleFields, author_id }, { transaction });

      await Promise.all(translations.map(t =>
        ArticleTranslation.create({ article_id: article.id, ...t }, { transaction })
      ));

      if (blocks) {
        await Promise.all(blocks.map(b =>
          ArticleBlock.create({ article_id: article.id, ...b }, { transaction })
        ));
      }

      if (tag_ids) {
        await Promise.all(tag_ids.map(tag_id =>
          ArticleTag.create({ article_id: article.id, tag_id }, { transaction })
        ));
      }

      if (category_ids) {
        await Promise.all(category_ids.map(category_id =>
          ArticleCategory.create({ article_id: article.id, category_id }, { transaction })
        ));
      }

      await transaction.commit();
      return await this .findById (article.id)
      // return article;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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