const User = require('./user');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  budgetName: {
    type: String,
    ref: 'Budget',
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: String,
  amount: {
    type: Number,
    required: true,
  },
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = TransactionModel;