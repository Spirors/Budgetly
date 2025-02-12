const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addBudget, addTransaction, getBudgets, getTransactions, deleteBudget, deleteTransaction } = require('../controllers/dataControllers');

router.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true
	})
);

router.post('/addBudget', addBudget);
router.post('/addTransaction', addTransaction);
router.get('/getBudgets/:userId', getBudgets);
router.get('/getTransactions/:userId', getTransactions);
router.delete('/deleteBudget', deleteBudget);
router.delete('/deleteTransaction', deleteTransaction);

module.exports = router;