const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleTag extends Model {
    static associate(models) {
      // join table
    }
  }

  ArticleTag.init({
    article_id: { type: DataTypes.INTEGER, allowNull: false },
    tag_id:     { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'ArticleTag',
    tableName: 'article_tags',
    underscored: true,
    timestamps: true,
    paranoid: false
  });

  return ArticleTag;
};