const expense= require('../../controllers/expense.cotroller')
const express = require("express");
const router = express.Router();

router.post('/',expense.addBudget);

router.get('/:date',expense.getExpenseOn);

router.get('/:startDate/:endDate',expense.getExpenseRange);

router.get('/monthlyAnalysis',expense.monthlyAnalysis);

router.delete('/:expenseId', expense.deleteExpense);

module.exports=router;