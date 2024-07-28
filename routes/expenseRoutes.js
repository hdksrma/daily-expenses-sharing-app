const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middlewares/auth');

router.post('/add-expense', auth, expenseController.addExpense);
router.get('/get-user-expenses/:userId', auth, expenseController.getUserExpenses);
router.get('/get-overall-expenses', auth, expenseController.getOverallExpenses);

module.exports = router;