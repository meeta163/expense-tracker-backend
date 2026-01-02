const Expense = require('../models/Expense');

// Create expense
const createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const expense = await Expense.create({ title, amount, category, date, user: req.user._id });
  res.status(201).json(expense);
};

// Get all expenses
const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

// Update expense
const updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  Object.assign(expense, req.body);
  const updated = await expense.save();
  res.json(updated);
};

// Delete expense
// Delete expense
const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted successfully' });
};


module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };
