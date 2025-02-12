const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addBudget, addTransaction, getBudget, getTransaction, deleteBudget, deleteTransaction } = require('../controllers/dataControllers');

router.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true
	})
);

router.post('/addBudget', addBudget);
router.post('/addTransaction', addTransaction);
router.get('/getBudget', getBudget);
router.get('/getTransaction', getTransaction);
router.delete('/deleteBudget', deleteBudget);
router.delete('/deleteTransaction', deleteTransaction);

module.exports = router;