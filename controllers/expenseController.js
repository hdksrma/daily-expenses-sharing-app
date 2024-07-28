const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const { validateExpenseInput } = require('../utils/dataValidator');

async function addExpense(req, res) {
    try {
        const { description, amount, splitMethod, participants, createdBy } = req.body;
        validateExpenseInput(splitMethod, participants, amount);

        const expense = new Expense({
            description,
            amount,
            splitMethod,
            participants,
            createdBy
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getUserExpenses(req, res) {
    try {
        const expenses = await Expense.find({ 'participants.userId': req.params.userId });
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getOverallExpenses(req, res) {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { addExpense, getUserExpenses, getOverallExpenses };

