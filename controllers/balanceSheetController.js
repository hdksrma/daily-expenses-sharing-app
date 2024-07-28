const Expense = require('../models/expenseModel');
const { generateCSV } = require('../utils/csvGenerator');

async function fetchExpenses() {
    try {
        const expenses = await Expense.find().populate('participants.userId').populate('createdBy');
        return expenses;
    } catch (err) {
        console.error('Error fetching expenses:', err);
        throw err;
    }
}

function processExpenses(expenses) {
    const individualExpenses = [];
    const overallExpenses = {};

    expenses.forEach(expense => {
        const { amount, splitMethod, participants, description, createdBy } = expense;

        participants.forEach(participant => {
            let amountOwed;
            if (splitMethod === 'percentage') {
                amountOwed = (participant.percentageOwed / 100) * amount;
            } else if (splitMethod === 'equal') {
                amountOwed = amount / participants.length;
            } else {
                amountOwed = participant.amountOwed;
            }

            individualExpenses.push({
                description,
                participant: participant.userId.name,
                amountOwed: amountOwed.toFixed(2)
            });

            if (!overallExpenses[participant.userId.name]) {
                overallExpenses[participant.userId.name] = 0;
            }
            overallExpenses[participant.userId.name] += amountOwed;
        });

        if (!overallExpenses[createdBy.name]) {
            overallExpenses[createdBy.name] = 0;
        }
        overallExpenses[createdBy.name] += amount;
    });

    return { individualExpenses, overallExpenses };
}

async function generateBalanceSheet(req, res) {
    try {
        const expenses = await fetchExpenses();
        const { individualExpenses, overallExpenses } = processExpenses(expenses);
        const csvFilePath = generateCSV(individualExpenses, overallExpenses);
        
        res.download(csvFilePath, 'balance_sheet.csv', (err) => {
            if (err) {
                console.error('Error downloading CSV:', err);
                res.status(500).send('Error downloading CSV');
            }
        });
    } catch (err) {
        res.status(500).send('Error generating balance sheet');
    }
}

module.exports = {
    generateBalanceSheet
};
