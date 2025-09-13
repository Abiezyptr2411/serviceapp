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

const Katalog = sequelize.define('Katalog', {
	nama: DataTypes.STRING,
	deskripsi: DataTypes.TEXT,
	harga: DataTypes.INTEGER,
});

sequelize.sync();

async function listKatalog() {
	return await Katalog.findAll();
}

async function getKatalogById(id) {
	return await Katalog.findByPk(id);
}

module.exports = {
	Katalog,
	listKatalog,
	getKatalogById,
};
