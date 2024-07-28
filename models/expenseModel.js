const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  splitMethod: {
    type: String,
    enum: ['equal', 'exact', 'percentage'],
    required: true
  },
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      amountOwed: {
        type: Number
      },
      percentageOwed: {
        type: Number
      }
    }
  ],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
 }
});

module.exports = mongoose.model('Expense', expenseSchema);

