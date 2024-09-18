'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    static associate(models) {
      // Relasi Transaksi ke User (Many-to-One)
      Transaksi.belongsTo(models.User, {
        foreignKey: 'id_user',
      });

      // Relasi Transaksi ke Meja (Many-to-One)
      Transaksi.belongsTo(models.Meja, {
        foreignKey: 'id_meja',
      });

      // Relasi Transaksi ke DetailTransaksi (One-to-Many)
      Transaksi.hasMany(models.DetailTransaksi, {
        foreignKey: 'id_transaksi',
      });
    }
  }

  Transaksi.init(
    {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tgl_transaksi: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nama_pelanggan: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('belum_bayar', 'lunas'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaksi',
      tableName: 'transaksis',
      timestamps: false,
    }
  );

  return Transaksi;
};
