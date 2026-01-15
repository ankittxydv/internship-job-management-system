const express = require('express');
const router = express.Router();
const {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getSummary
} = require('../controllers/expense.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // Protect all expense routes

router.route('/')
    .get(getExpenses)
    .post(addExpense);

router.get('/summary', getSummary);

router.route('/:id')
    .put(updateExpense)
    .delete(deleteExpense);

module.exports = router;
