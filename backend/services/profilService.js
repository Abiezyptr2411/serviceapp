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

const Profil = sequelize.define('Profil', {
	userId: DataTypes.INTEGER,
	nama: DataTypes.STRING,
	alamat: DataTypes.STRING,
	telepon: DataTypes.STRING,
});

sequelize.sync();

async function getProfil(userId) {
	return await Profil.findOne({ where: { userId } });
}

async function updateProfil(userId, data) {
	const profil = await Profil.findOne({ where: { userId } });
	if (profil) {
		await profil.update(data);
	}
	return profil;
}

module.exports = {
	Profil,
	getProfil,
	updateProfil,
};
