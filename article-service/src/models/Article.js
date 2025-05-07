const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.hasMany(models.ArticleTranslation, { foreignKey: 'article_id' });
      Article.hasMany(models.ArticleBlock,       { foreignKey: 'article_id' });
      Article.belongsToMany(models.Category, {
        through: models.ArticleCategory,
        foreignKey: 'article_id'
      });
      Article.belongsToMany(models.Tag, {
        through: models.ArticleTag,
        foreignKey: 'article_id'
      });
    }
  }

  Article.init({
    slug:             { type: DataTypes.STRING(255), allowNull: false, unique: true },
    status:           { type: DataTypes.ENUM('draft','scheduled','published'), allowNull: false, defaultValue: 'draft' },
    scheduled_at:     { type: DataTypes.DATE },
    published_at:     { type: DataTypes.DATE },
    author_id:        { type: DataTypes.INTEGER },
    secret_key:       { type: DataTypes.STRING(255) },
    must_be_logged_in:{ type: DataTypes.BOOLEAN, defaultValue: false },
    must_be_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    must_be_over_18:  { type: DataTypes.BOOLEAN, defaultValue: false },
    geo_block_mode:   { type: DataTypes.ENUM('allow','deny') },
    geo_block_countries: { type: DataTypes.JSON },
    metadata:         { type: DataTypes.JSON }
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    underscored: true,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return Article;
};