const Budget = require('../models/budget');
const Transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');

const addBudget = async (req, res) => {
  try {
    const { userId, name, max } = req.body;

		// Check name
		const exist = await Budget.findOne({ name });
		if (exist) {
			return res.json({ error: 'Budget already exist' });
		}

    // Check if max is enter
		if (!max) {
			return res.json({ error: 'Max value is required' });
		}

    const budget = await Budget.create({
			userId,
			name,
			max,
		});
		return res.json(budget);
  } catch (error) {
    console.log(error);
  }
};

const addTransaction = async (req, res) => {
	try {
    const { userId, budgetName, date, description, amount } = req.body;

		// Check if the budget exists, if not create an "Uncategorized" budget
    const exist = await Budget.findOne({ userId, name: budgetName });
    if (!exist) {
      if (budgetName === 'Uncategorized') {
        Budget.create({
          userId,
          name: 'Uncategorized',
        });
      } else {
        return res.json({ error: 'Budget does not exist' });
      }
    }

    // Check if amount is enter
		if (!amount) {
			return res.json({ error: 'Amount value is required' });
		}

		const transaction = await Transaction.create({
			userId,
			budgetName,
			date,
			description,
			amount,
		});
		return res.json(transaction);
  } catch (error) {
    console.log(error);
  }
};

const getBudgets = async (req, res) => {
	try {
    const { userId } = req.params;
    const budgets = await Budget.find({ userId });
    res.json(budgets);
  } catch (error) {
    console.log(error);
  }
};

const getTransactions = async (req, res) => {
	try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (error) {
    console.log(error);
  }
};

const deleteBudget = async (req, res) => {
};

const deleteTransaction = async (req, res) => {
};

module.exports = {
  addBudget,
  addTransaction,
	getBudgets,
  getTransactions,
  deleteBudget,
  deleteTransaction,
};