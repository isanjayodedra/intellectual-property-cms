const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleCategory extends Model {
    static associate(models) {
      // join table: no direct associations needed here
    }
  }

  ArticleCategory.init({
    article_id:  { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'ArticleCategory',
    tableName: 'article_categories',
    underscored: true,
    timestamps: true,
    paranoid: false
  });

  return ArticleCategory;
};