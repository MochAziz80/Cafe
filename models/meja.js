'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meja extends Model {
    static associate(models) {
      // Relasi Meja ke Transaksi (One-to-Many)
      Meja.hasMany(models.Transaksi, {
        foreignKey: 'id_meja',
      });
    }
  }

  Meja.init(
    {
      id_meja: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nomor_meja: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Meja',
      tableName: 'mejas',
      timestamps: false,
    }
  );

  return Meja;
};
