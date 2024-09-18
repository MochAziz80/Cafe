'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      // Relasi Menu ke DetailTransaksi (One-to-Many)
      Menu.hasMany(models.DetailTransaksi, {
        foreignKey: 'id_menu',
      });
    }
  }

  Menu.init(
    {
      id_menu: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_menu: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      jenis: {
        type: DataTypes.ENUM('makanan', 'minuman'),
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.TEXT,
      },
      gambar: {
        type: DataTypes.STRING(255),
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Menu',
      tableName: 'menus',
      timestamps: false,
    }
  );

  return Menu;
};
