exports.validateExpenseInput = (splitMethod, participants, totalAmount) => {
    if (splitMethod === 'percentage') {
        const totalPercentage = participants.reduce((acc, participant) => acc + participant.percentageOwed, 0);
        if (totalPercentage !== 100) {
            throw new Error('Percentages must add up to 100%');
        }
    } else if (splitMethod === 'exact') {
        const totalExactAmount = participants.reduce((acc, participant) => acc + participant.amountOwed, 0);
        if (totalExactAmount !== totalAmount) {
            throw new Error('Exact amounts must add up to total expense amount');
        }
    }
};