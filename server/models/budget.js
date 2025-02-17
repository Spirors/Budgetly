const User = require('./user');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  max: Number,
});

const BudgetModel = mongoose.model('Budget', budgetSchema);
module.exports = BudgetModel;