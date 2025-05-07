const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleTranslation extends Model {
    static associate(models) {
      ArticleTranslation.belongsTo(models.Article, { foreignKey: 'article_id', onDelete: 'CASCADE' });
    }
  }

  ArticleTranslation.init({
    article_id:    { type: DataTypes.INTEGER, allowNull: false },
    language_code: { type: DataTypes.STRING(5), allowNull: false },
    title:         { type: DataTypes.STRING(500), allowNull: false },
    description:   { type: DataTypes.TEXT },
    locale:        { type: DataTypes.STRING(10) },
    sponsor_name:  { type: DataTypes.STRING(255) },
    sponsor_logo_url: { type: DataTypes.STRING(2083) },
    sponsor_url:      { type: DataTypes.STRING(2083) }
  }, {
    sequelize,
    modelName: 'ArticleTranslation',
    tableName: 'article_translations',
    underscored: true,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return ArticleTranslation;
};