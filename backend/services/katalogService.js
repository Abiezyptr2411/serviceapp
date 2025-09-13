const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

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
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // boleh kosong
  },
});

sequelize.sync();

async function listKatalog() {
  return await Katalog.findAll({
    where: { status: 'active' },
    attributes: ['id', 'nama', 'deskripsi', 'harga', 'status', 'image', 'createdAt', 'updatedAt'],
  });
}

async function getKatalogById(id) {
  return await Katalog.findByPk(id, {
    attributes: ['id', 'nama', 'deskripsi', 'harga', 'status', 'image', 'createdAt', 'updatedAt'],
  });
}

module.exports = {
  Katalog,
  listKatalog,
  getKatalogById,
};
