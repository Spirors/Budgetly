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
};

const getBudget = async (req, res) => {
};

const getTransaction = async (req, res) => {
};

const deleteBudget = async (req, res) => {
};

const deleteTransaction = async (req, res) => {
};

module.exports = {
  addBudget,
  addTransaction,
	getBudget,
  getTransaction,
  deleteBudget,
  deleteTransaction,
};