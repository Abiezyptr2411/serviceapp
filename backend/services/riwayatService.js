const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// ...existing code...
const sequelize = new Sequelize(
	process.env.MYSQL_DB || 'serviceapp',
	process.env.MYSQL_USER || 'root',
	process.env.MYSQL_PASSWORD || '',
	{
		host: process.env.MYSQL_HOST || 'localhost',
		port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3307,
		dialect: 'mysql',
	}
);

const Riwayat = sequelize.define('Riwayat', {
	userId: DataTypes.INTEGER,
	tanggal: DataTypes.DATE,
	layanan: DataTypes.STRING,
	status: DataTypes.STRING,
});

sequelize.sync();

async function listRiwayatByUser(userId) {
	return await Riwayat.findAll({ where: { userId } });
}

module.exports = {
	Riwayat,
	listRiwayatByUser,
};
