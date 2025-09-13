const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
	process.env.MYSQL_DB || 'serviceapp',
	process.env.MYSQL_USER || 'root',
	process.env.MYSQL_PASSWORD || '',
	{
		host: process.env.MYSQL_HOST || 'localhost',
		dialect: 'mysql',
	}
);

const Voucher = sequelize.define('Voucher', {
	kode: DataTypes.STRING,
	deskripsi: DataTypes.TEXT,
	status: {
		type: DataTypes.STRING,
		defaultValue: 'available',
	},
});

sequelize.sync();

async function listVoucher() {
	return await Voucher.findAll();
}

async function claimVoucher(id) {
	const voucher = await Voucher.findByPk(id);
	if (voucher) {
		voucher.status = 'claimed';
		await voucher.save();
	}
	return voucher;
}

module.exports = {
	Voucher,
	listVoucher,
	claimVoucher,
};
