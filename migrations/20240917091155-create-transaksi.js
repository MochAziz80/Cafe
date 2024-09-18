'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksis', {
      id_transaksi: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tgl_transaksi: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id_user',
        },
        allowNull: false,
      },
      id_meja: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mejas',
          key: 'id_meja',
        },
        allowNull: false,
      },
      nama_pelanggan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('belum_bayar', 'lunas'),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksis');
  }
};
