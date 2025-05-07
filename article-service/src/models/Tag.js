const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Article, {
        through: models.ArticleTag,
        foreignKey: 'tag_id'
      });
    }
  }

  Tag.init({
    name:        { type: DataTypes.STRING(255), allowNull: false, unique: true },
    slug:        { type: DataTypes.STRING(255), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    is_active:   { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    underscored: true,
    timestamps: true,
    paranoid: false
  });

  return Tag;
};