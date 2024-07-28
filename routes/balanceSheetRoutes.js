const express = require('express');
const router = express.Router();
const { generateBalanceSheet } = require('../controllers/balanceSheetController');
const auth = require('../middlewares/auth');

router.get('/download-balance-sheet', auth, generateBalanceSheet);

module.exports = router;