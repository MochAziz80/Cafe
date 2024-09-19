const mejaModel = require('../models/index').Meja;

const mejaControl = {
    // CREATE Meja
    async create_meja(req, res) {
        const newMeja = {
            nomor_meja: req.body.nomor_meja,
            status: req.body.status || true // Default status meja adalah 'tersedia'
        };

        try {
        
            const existingMeja = await mejaModel.findOne({ where: { nomor_meja: newMeja.nomor_meja } });
            if (existingMeja) {
                return res.status(400).json({
                    success: false,
                    message: 'Nomor meja sudah ada'
                });
            }

            const meja = await mejaModel.create(newMeja);
            return res.status(201).json({
                success: true,
                message: 'Meja created successfully',
                data: meja
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error creating meja',
                error: error.message
            });
        }
    },

    // READ (Get All Mejas)
    async get_all_mejas(req, res) {
        try {
            const mejas = await mejaModel.findAll();
            return res.status(200).json({
                success: true,
                message: 'All mejas fetched successfully',
                data: mejas
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching mejas',
                error: error.message
            });
        }
    },

    // READ (Get a Single Meja by ID)
    async get_meja_by_id(req, res) {
        const id = req.params.id_meja;

        try {
            const meja = await mejaModel.findByPk(id);
            if (!meja) {
                return res.status(404).json({
                    success: false,
                    message: 'Meja not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Meja fetched successfully',
                data: meja
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching meja',
                error: error.message
            });
        }
    },

    // UPDATE Meja
    async update_meja(req, res) {
        const id = req.params.id_meja;
        const updatedMeja = {
            nomor_meja: req.body.nomor_meja,
            status: req.body.status
        };

        try {
            const meja = await mejaModel.findByPk(id);
            if (!meja) {
                return res.status(404).json({
                    success: false,
                    message: 'Meja not found'
                });
            }

            await mejaModel.update(updatedMeja, { where: { id_meja: id } });

            return res.status(200).json({
                success: true,
                message: 'Meja updated successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error updating meja',
                error: error.message
            });
        }
    },


    async update_status_by_nomor_meja(req, res) {
        const nomorMeja = req.params.nomor_meja;
        const newStatus = req.body.status;

        try {
            // 1. Cek apakah meja dengan nomor meja tertentu ada di database
            const meja = await mejaModel.findOne({ where: { nomor_meja: nomorMeja } });
            if (!meja) {
                return res.status(404).json({
                    success: false,
                    message: 'Meja not found'
                });
            }

            // 2. Update status meja
            await mejaModel.update({ status: newStatus }, { where: { nomor_meja: nomorMeja } });
            console.log(newStatus)

            return res.status(200).json({
                success: true,
                message: 'Meja status updated successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error updating meja status',
                error: error.message
            });
        }
    },

    // DELETE Meja
    async delete_meja(req, res) {
        const id = req.params.id_meja;

        try {
            const meja = await mejaModel.findByPk(id);
            if (!meja) {
                return res.status(404).json({
                    success: false,
                    message: 'Meja not found'
                });
            }

            await mejaModel.destroy({ where: { id_meja: id } });

            return res.status(200).json({
                success: true,
                message: 'Meja deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error deleting meja',
                error: error.message
            });
        }
    }
};

module.exports = mejaControl;
