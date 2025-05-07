const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Article, {
        through: models.ArticleCategory,
        foreignKey: 'category_id'
      });
    }
  }

  Category.init({
    name:        { type: DataTypes.STRING(255), allowNull: false, unique: true },
    slug:        { type: DataTypes.STRING(255), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    sort_order:  { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active:   { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    underscored: true,
    timestamps: true,
    paranoid: false
  });

  return Category;
};