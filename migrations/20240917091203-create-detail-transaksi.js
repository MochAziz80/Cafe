'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detail_transaksis', {
      id_detail_transaksi: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transaksis',
          key: 'id_transaksi',
        },
        allowNull: false,
      },
      id_menu: {
        type: Sequelize.INTEGER,
        references: {
          model: 'menus',
          key: 'id_menu',
        },
        allowNull: false,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detail_transaksis');
  }
};
