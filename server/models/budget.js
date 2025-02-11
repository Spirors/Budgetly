const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  max: Number
});

const BudgetModel = mongoose.model('Budget', budgetSchema);
module.exports = BudgetModel;