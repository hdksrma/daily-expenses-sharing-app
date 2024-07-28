const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive']
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
        type: Number,
        min: [0, 'Amount owed must be positive'],
        validate: {
          validator: function(v) {
            return this.splitMethod !== 'percentage' || v === undefined;
          },
          message: 'Amount owed should be undefined when split method is percentage'
        }
      },
      percentageOwed: {
        type: Number,
        min: [0, 'Percentage owed must be positive'],
        max: [100, 'Percentage owed cannot exceed 100'],
        validate: {
          validator: function(v) {
            return this.splitMethod !== 'exact' || v === undefined;
          },
          message: 'Percentage owed should be undefined when split method is exact'
        }
      }
    }
  ],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Expense', expenseSchema);
