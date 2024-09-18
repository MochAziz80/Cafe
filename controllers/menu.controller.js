const menuModel = require('../models/index').Menu;

const menuControl = {
    // CREATE Menu
    async create_menu(req, res) {
        const newMenu = {
            nama_menu: req.body.nama_menu,
            harga: req.body.harga,
            kategori: req.body.kategori
        };

        try {
            const menu = await menuModel.create(newMenu);
            return res.status(201).json({
                success: true,
                message: 'Menu created successfully',
                data: menu
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error creating menu',
                error: error.message
            });
        }
    },

    // READ (Get All Menus)
    async get_all_menus(req, res) {
        try {
            const menus = await menuModel.findAll();
            return res.status(200).json({
                success: true,
                message: 'All menus fetched successfully',
                data: menus
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching menus',
                error: error.message
            });
        }
    },

    // UPDATE Menu
    async update_menu(req, res) {
        const id = req.params.id_menu;
        const updatedMenu = {
            nama_menu: req.body.nama_menu,
            harga: req.body.harga,
            kategori: req.body.kategori
        };

        try {
            const menu = await menuModel.findByPk(id);
            if (!menu) {
                return res.status(404).json({
                    success: false,
                    message: 'Menu not found'
                });
            }

            await menuModel.update(updatedMenu, { where: { id_menu: id } });

            return res.status(200).json({
                success: true,
                message: 'Menu updated successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error updating menu',
                error: error.message
            });
        }
    },

    // DELETE Menu
    async delete_menu(req, res) {
        const id = req.params.id_menu;

        try {
            const menu = await menuModel.findByPk(id);
            if (!menu) {
                return res.status(404).json({
                    success: false,
                    message: 'Menu not found'
                });
            }

            await menuModel.destroy({ where: { id_menu: id } });

            return res.status(200).json({
                success: true,
                message: 'Menu deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error deleting menu',
                error: error.message
            });
        }
    }
};

module.exports = menuControl;
