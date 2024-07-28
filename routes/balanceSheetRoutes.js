const express = require('express');
const router = express.Router();
const { generateBalanceSheet } = require('../controllers/balanceSheetController');

router.get('/download-balance-sheet', generateBalanceSheet);

module.exports = router;
