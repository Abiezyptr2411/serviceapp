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

const LokasiBengkel = sequelize.define('LokasiBengkel', {
	nama: DataTypes.STRING,
	alamat: DataTypes.STRING,
	latitude: DataTypes.FLOAT,
	longitude: DataTypes.FLOAT,
});

sequelize.sync();

async function listLokasiBengkel() {
	return await LokasiBengkel.findAll();
}

module.exports = {
	LokasiBengkel,
	listLokasiBengkel,
};
