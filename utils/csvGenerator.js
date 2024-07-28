const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

function generateCSV(individualExpenses, overallExpenses) {
    const individualFields = ['description', 'participant', 'amountOwed'];
    const overallFields = ['participant', 'totalOwed'];

    const individualParser = new Parser({ fields: individualFields });
    const overallParser = new Parser({ fields: overallFields });

    const individualCsv = individualParser.parse(individualExpenses);
    const overallCsv = overallParser.parse(Object.entries(overallExpenses).map(([participant, totalOwed]) => ({ participant, totalOwed: totalOwed.toFixed(2) })));

    const csvFilePath = path.join(__dirname, '..', 'balance_sheet.csv');
    fs.writeFileSync(csvFilePath, individualCsv + '\n\n' + overallCsv);

    return csvFilePath;
}

module.exports = {
    generateCSV
};
