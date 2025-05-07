const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleBlock extends Model {
    static associate(models) {
      ArticleBlock.belongsTo(models.Article, { foreignKey: 'article_id', onDelete: 'CASCADE' });
      ArticleBlock.belongsTo(models.Block,   { foreignKey: 'block_id',   onDelete: 'CASCADE' });
    }
  }

  ArticleBlock.init({
    article_id:    { type: DataTypes.INTEGER, allowNull: false },
    block_id:      { type: DataTypes.INTEGER, allowNull: false },
    language_code: { type: DataTypes.STRING(5), allowNull: false, defaultValue: 'en' },
    title:         { type: DataTypes.STRING(255) },
    block_type:    { type: DataTypes.STRING(50) },
    content:       { type: DataTypes.JSON,     allowNull: false },
    sort_order:    { type: DataTypes.INTEGER,  defaultValue: 0 },
    created_by:    { type: DataTypes.INTEGER },
    updated_by:    { type: DataTypes.INTEGER },
    version:       { type: DataTypes.INTEGER,  defaultValue: 1 }
  }, {
    sequelize,
    modelName: 'ArticleBlock',
    tableName: 'article_blocks',
    underscored: true,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return ArticleBlock;
};