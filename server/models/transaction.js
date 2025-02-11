const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  description: String,
  amount: {
    type: Number,
    required: true,
  },
  budgetId: String
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = TransactionModel;