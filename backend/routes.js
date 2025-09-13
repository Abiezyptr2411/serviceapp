const express = require('express');
const { User, registerUser } = require('./services/userService');
const { createBooking, Booking } = require('./services/bookingService');
const Berita = require('./services/beritaService');
const Katalog = require('./services/katalogService');
const Voucher = require('./services/voucherService');
const LokasiBengkel = require('./services/lokasiBengkelService');
const Riwayat = require('./services/riwayatService');
const Profil = require('./services/profilService');
const Games = require('./services/gamesService');
const Formulasi = require('./services/formulasiService');
const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      status: false,
      responseCode: '01',
      message: 'Username, email, and password are required.'
    });
  }
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      responseCode: '01',
      message: 'Invalid email format.'
    });
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        responseCode: '01',
        message: 'Email is already registered.'
      });
    }
    await registerUser({ username, email, password, role });
    res.status(201).json({
      status: true,
      responseCode: '00',
      message: 'Registration successful.'
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      responseCode: '01',
      message: 'Registration failed.',
      error: error.message
    });
  }
});

// Sign On
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        status: false,
        responseCode: '01',
        message: 'Invalid email or password'
      });
    }
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        responseCode: '01',
        message: 'Invalid email or password'
      });
    }
    res.status(200).json({
      status: true,
      responseCode: '00',
      message: 'Login successful',
      user
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      responseCode: '01',
      message: 'Login failed',
      error: error.message
    });
  }
});

// Booking Service
router.post('/booking', async (req, res) => {
  const { userId, tanggal, layanan, status } = req.body;
  if (!userId || !tanggal || !layanan) {
    return res.status(400).json({
      status: false,
      responseCode: '01',
      message: 'userId, tanggal, and layanan are required.'
    });
  }
  try {
    const booking = await createBooking({
      userId,
      tanggal,
      layanan,
      status: status || 'pending'
    });
    res.status(201).json({
      status: true,
      responseCode: '00',
      message: 'Booking created successfully.',
      booking
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      responseCode: '01',
      message: 'Booking creation failed.',
      error: error.message
    });
  }
});

router.get('/booking', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({
      status: false,
      responseCode: '01',
      message: 'userId is required.'
    });
  }
  try {
    const bookings = await Booking.findAll({ where: { userId } });
    res.status(200).json({
      status: true,
      responseCode: '00',
      message: 'Bookings fetched successfully.',
      bookings
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      responseCode: '01',
      message: 'Failed to fetch bookings.',
      error: error.message
    });
  }
});

// News
router.get('/berita', (req, res) => {
  res.json({ responseCode: '00', berita: [] });
});
router.get('/berita/:id', (req, res) => {
  res.json({ responseCode: '00', berita: {} });
});

// Catalog Product
router.get('/katalog', (req, res) => {
  res.json({ responseCode: '00', katalog: [] });
});
router.get('/katalog/:id', (req, res) => {
  res.json({ responseCode: '00', katalog: {} });
});

// Vouchers
router.get('/voucher', (req, res) => {
  res.json({ responseCode: '00', voucher: [] });
});
router.post('/voucher/claim', (req, res) => {
  res.json({ responseCode: '00', message: 'Voucher claimed (dummy)' });
});

// Location Shop
router.get('/lokasi-bengkel', (req, res) => {
  res.json({ responseCode: '00', lokasi: [] });
});

// Histories Services
router.get('/riwayat/:userId', (req, res) => {
  res.json({ responseCode: '00', riwayat: [] });
});

// Profiles
router.get('/profil/:userId', (req, res) => {
  res.json({ responseCode: '00', profil: {} });
});
router.put('/profil/:userId', (req, res) => {
  res.json({ responseCode: '00', message: 'Profil updated (dummy)' });
});

// Games
router.get('/games', (req, res) => {
  res.json({ responseCode: '00', games: [] });
});
router.post('/games/play', (req, res) => {
  res.json({ responseCode: '00', message: 'Game played (dummy)' });
});

// Formulations
router.post('/formulasi', (req, res) => {
  res.json({ responseCode: '00', result: 'Formulasi processed (dummy)' });
});

module.exports = router;
