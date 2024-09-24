const { Transaksi, DetailTransaksi, Menu, Meja, User } = require("../models");

const transaksiController = {
    async createTransaksi(req, res) {
        const { items, nama_pelanggan } = req.body;
        const id_user = req.user.id_user; // Ambil id_user dari token yang didecode

        try {
            // Pastikan id_user ada di tabel users
            const user = await User.findByPk(id_user);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const availableMeja = await Meja.findOne({ where: { status: true } });
            if (!availableMeja) {
                return res.status(400).json({
                    success: false,
                    message: "No available table",
                });
            }

            // Buat transaksi baru
            const transaksi = await Transaksi.create({
                id_user: id_user,
                id_meja: availableMeja.id_meja,
                tgl_transaksi: new Date(),
                nama_pelanggan: nama_pelanggan || "Guest",
                status: "belum_bayar",
            });

            let total = 0;
            for (const item of items) {
                const menu = await Menu.findByPk(item.id_menu);
                if (menu) {
                    // Buat detail transaksi untuk setiap item menu
                    await DetailTransaksi.create({
                        id_transaksi: transaksi.id_transaksi,
                        id_menu: item.id_menu,
                        jumlah: item.jumlah,
                        harga: menu.harga * item.jumlah,
                    });
                    total += menu.harga * item.jumlah;
                }
            }

            // Update total transaksi
            transaksi.total = total;
            await transaksi.save();

            // Update status meja jadi terpakai
            availableMeja.status = false;
            await availableMeja.save();



            return res.status(201).json({
                success: true,
                message: "Transaction created successfully",
                data: transaksi,
            });
        } catch (error) {
            console.error("Transaction creation error: ", error);
            return res.status(500).json({
                success: false,
                message: "Error creating transaction",
                error: error.message,
            });
        }
    },

    async getAllTransaksi(req, res) {
        try {
            const transaksi = await Transaksi.findAll({
                include: [
                    { model: DetailTransaksi, include: [Menu] },
                    { model: Meja },
                    // { model: User }
                ]
            });
            return res.status(200).json({
                success: true,
                data: transaksi
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching transactions',
                error: error.message
            });
        }
    },


    async updateTransaksiStatus(req, res) {
        const { id_transaksi } = req.params;

        try {
            // Temukan transaksi berdasarkan ID
            const transaksi = await Transaksi.findByPk(id_transaksi);

            if (!transaksi) {
                return res.status(404).json({
                    success: false,
                    message: 'Transaction not found'
                });
            }

            // Periksa apakah transaksi sudah lunas
            if (transaksi.status === 'lunas') {
                return res.status(400).json({
                    success: false,
                    message: 'Transaction is already paid'
                });
            }

            // Update status transaksi menjadi "lunas"
            transaksi.status = 'lunas';
            await transaksi.save();

            // Temukan meja terkait transaksi
            const meja = await Meja.findByPk(transaksi.id_meja);

            if (meja) {
                // Ubah status meja menjadi "true" (tersedia)
                meja.status = true;
                await meja.save();
            }

            return res.status(200).json({
                success: true,
                message: 'Transaction marked as paid and table is now available',
                data: transaksi
            });
        } catch (error) {
            console.error("Update transaction status error: ", error);
            return res.status(500).json({
                success: false,
                message: 'Error updating transaction status',
                error: error.message
            });
        }
    },

    async printNota(req, res) {
        const { id_transaksi } = req.params;

        try {
            // Temukan transaksi berdasarkan ID
            const transaksi = await Transaksi.findByPk(id_transaksi, {
                include: [
                    {
                        model: DetailTransaksi,
                        include: [Menu] // Include menu untuk mengambil detail menu dari transaksi
                    },
                    {
                        model: User, // Include user untuk mengambil nama kasir
                        attributes: ['nama_user'] // Hanya ambil nama_user dari User
                    }
                ]
            });
            console.log('Transaksi dengan Detail:', JSON.stringify(transaksi, null, 2));
            if (!transaksi) {
                return res.status(404).json({
                    success: false,
                    message: 'Transaction not found'
                });
            }

            // Pastikan DetailTransaksi ada
            const detailTransaksi = transaksi.DetailTransaksis || []; // Default to empty array if undefined

            // Format data untuk mencetak nota
            const nota = {
                nama_cafe: 'Wikusama Cafe',
                tgl_transaksi: transaksi.tgl_transaksi,
                nama_kasir: transaksi.User.nama_user,
                nama_pelanggan: transaksi.nama_pelanggan,
                items: detailTransaksi.map((detail) => ({
                    nama_menu: detail.Menu.nama_menu,
                    harga: detail.harga,
                    jumlah: detail.jumlah
                })),
                total: transaksi.total
            };

            // Responkan nota dalam format JSON atau render PDF/text
            return res.status(200).json({
                success: true,
                message: 'Transaction receipt',
                data: nota
            });
        } catch (error) {
            console.error("Error printing receipt: ", error);
            return res.status(500).json({
                success: false,
                message: 'Error printing receipt',
                error: error.message
            });
        }
    }

}

module.exports = transaksiController;
