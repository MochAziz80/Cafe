'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetailTransaksi extends Model {
    static associate(models) {
      DetailTransaksi.belongsTo(models.Transaksi, {
        foreignKey: 'id_transaksi',
      });

      DetailTransaksi.belongsTo(models.Menu, {
        foreignKey: 'id_menu',
      });
    }
  }

  DetailTransaksi.init(
    {
      id_detail_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DetailTransaksi',
      tableName: 'detail_transaksis',
      timestamps: false,
    }
  );

  return DetailTransaksi;
};
