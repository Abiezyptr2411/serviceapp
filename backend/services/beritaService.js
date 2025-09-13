const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

	process.env.MYSQL_DB || 'serviceapp',
	process.env.MYSQL_USER || 'root',
	process.env.MYSQL_PASSWORD || '',
	{
		host: process.env.MYSQL_HOST || 'localhost',
		dialect: 'mysql',
	};
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

const Berita = sequelize.define('Berita', {
	judul: DataTypes.STRING,
	isi: DataTypes.TEXT,
	tanggal: DataTypes.DATE,
});

sequelize.sync();

async function listBerita() {
	return await Berita.findAll();
}

async function getBeritaById(id) {
	return await Berita.findByPk(id);
}

module.exports = {
	Berita,
	listBerita,
	getBeritaById,
};
