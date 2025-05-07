const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Block extends Model {
    static associate(models) {
      Block.hasMany(models.ArticleBlock, { foreignKey: 'block_id' });
    }
  }

  Block.init({
    name:            { type: DataTypes.STRING(50), allowNull: false, unique: true },
    label:           { type: DataTypes.STRING(100), allowNull: false },
    description:     { type: DataTypes.TEXT },
    icon:            { type: DataTypes.STRING(100) },
    schema:          { type: DataTypes.JSON },
    sort_order:      { type: DataTypes.INTEGER, defaultValue: 0 },
    allowed_modules: { type: DataTypes.JSON, allowNull: false },
    is_active:       { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by:      { type: DataTypes.INTEGER },
    updated_by:      { type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Block',
    tableName: 'blocks',
    underscored: true,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return Block;
};