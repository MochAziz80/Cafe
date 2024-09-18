'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('menus', {
      id_menu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nama_menu: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      jenis: {
        type: Sequelize.ENUM('makanan', 'minuman'),
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gambar: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('menus');
  }
};
