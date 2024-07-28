const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/add-expense', expenseController.addExpense);
router.get('/get-user-expenses/:userId', expenseController.getUserExpenses);
router.get('/get-overall-expenses', expenseController.getOverallExpenses);

module.exports = router;
