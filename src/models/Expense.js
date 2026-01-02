const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
