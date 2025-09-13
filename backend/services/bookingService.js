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

const Booking = sequelize.define('Booking', {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	tanggal: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	layanan: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: 'pending',
	},
});

sequelize.sync();

async function createBooking(data) {
	return await Booking.create(data);
}

async function getBookingsByUser(userId) {
	return await Booking.findAll({ where: { userId } });
}

module.exports = {
	Booking,
	createBooking,
	getBookingsByUser,
};
