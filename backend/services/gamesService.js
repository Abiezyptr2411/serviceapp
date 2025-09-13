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

const Games = sequelize.define('Games', {
	nama: DataTypes.STRING,
	deskripsi: DataTypes.TEXT,
});

sequelize.sync();

async function listGames() {
	return await Games.findAll();
}

async function playGame(id) {
	// Dummy logic
	return { result: 'Game played', id };
}

module.exports = {
	Games,
	listGames,
	playGame,
};
