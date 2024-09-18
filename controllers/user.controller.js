const bcrypt = require('bcryptjs');
const userModel = require('../models/index').User;


const createUser = async (req, res) => {
    const { nama_user, username, password, role } = req.body;

    try {
        const existingUser = await userModel.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah terdaftar.',
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await userModel.create({
            nama_user,
            username,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            success: true,
            message: 'User berhasil dibuat!',
            data: {
                id_user: newUser.id_user,
                nama_user: newUser.nama_user,
                username: newUser.username,
                role: newUser.role,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAll({
            attributes: ['id_user', 'nama_user', 'username', 'role'],
        });
        return res.status(200).json({
            success: true,
            message: 'Data user berhasil diambil!',
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        // Mencari user berdasarkan primary key
        const user = await userModel.findByPk(id_user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan.',
            });
        }

        await user.update(req.body);

        res.status(200).json({
            type: 'success',
            message: 'User updated successfully',
            updatedUser: user, // Mengirim user yang telah diupdate
        });
    } catch (err) {
        res.status(500).json({
            type: 'error',
            message: 'Something went wrong, please try again',
            err,
        });
    }
}




const deleteUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        const user = await userModel.findByPk(id_user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan.',
            });
        }

        await user.destroy();

        return res.status(200).json({
            success: true,
            message: 'User berhasil dihapus!',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message,
        });
    }
};

module.exports = { createUser, getAllUsers, deleteUser, updateUser };
