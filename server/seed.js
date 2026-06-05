import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/models/User.js';
import Expense from './src/models/Expense.js';
import connectDB from './src/config/db.js';

const expenses = [
  { title: 'Grocery shopping', amount: 2350, category: 'food', daysAgo: 2 },
  { title: 'Uber to office', amount: 320, category: 'transport', daysAgo: 5 },
  { title: 'Netflix subscription', amount: 649, category: 'entertainment', daysAgo: 8 },
  { title: 'Electricity bill', amount: 1800, category: 'utilities', daysAgo: 12 },
  { title: 'Gym membership', amount: 1500, category: 'health', daysAgo: 18 },
  { title: 'Movie tickets', amount: 450, category: 'entertainment', daysAgo: 22 },
  { title: 'Amazon order', amount: 3200, category: 'shopping', daysAgo: 28 },
  { title: 'Medicines', amount: 780, category: 'health', daysAgo: 35 },
  { title: 'Restaurant dinner', amount: 1650, category: 'food', daysAgo: 40 },
  { title: 'Bus pass', amount: 500, category: 'transport', daysAgo: 48 },
  { title: 'Mobile recharge', amount: 299, category: 'utilities', daysAgo: 55 },
  { title: 'Water bill', amount: 400, category: 'utilities', daysAgo: 62 },
  { title: 'Coffee at Starbucks', amount: 550, category: 'food', daysAgo: 70 },
  { title: 'Swiggy order', amount: 480, category: 'food', daysAgo: 75 },
  { title: 'Haircut', amount: 250, category: 'other', daysAgo: 80 },
];

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Expense.deleteMany({});

    const user = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123',
    });

    const now = new Date();
    const expenseDocs = expenses.map((e) => ({
      user: user._id,
      title: e.title,
      amount: e.amount,
      category: e.category,
      date: new Date(now.getTime() - e.daysAgo * 24 * 60 * 60 * 1000),
    }));

    await Expense.insertMany(expenseDocs);

    console.log(`Seeded ${expenseDocs.length} expenses for ${user.email}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
