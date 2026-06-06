import Expense from '../models/Expense.js';
import ApiError from '../utils/ApiError.js';

export const getExpenses = async (req, res, next) => {
  try {
    const {
      search,
      category,
      page = 1,
      limit = 10,
      sort = '-date',
    } = req.query;
    const query = { user: req.user._id };

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [expenses, total] = await Promise.all([
      Expense.find(query).sort(sort).skip(skip).limit(limitNum),
      Expense.countDocuments(query),
    ]);

    res.json({
      expenses,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      throw new ApiError(404, 'Expense not found');
    }
    if (expense.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized');
    }

    res.json(expense);
  } catch (err) {
    if (err.name === 'CastError')
      return next(new ApiError(404, 'Expense not found'));
    next(err);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user._id });
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      throw new ApiError(404, 'Expense not found');
    }
    if (expense.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized');
    }

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(expense);
  } catch (err) {
    if (err.name === 'CastError')
      return next(new ApiError(404, 'Expense not found'));
    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      throw new ApiError(404, 'Expense not found');
    }
    if (expense.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized');
    }

    await expense.deleteOne();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    if (err.name === 'CastError')
      return next(new ApiError(404, 'Expense not found'));
    next(err);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { month } = req.query;

    let targetYear, targetMonth;
    if (month && month.match(/^\d{4}-\d{2}$/)) {
      const [y, m] = month.split('-');
      targetYear = parseInt(y, 10);
      targetMonth = parseInt(m, 10) - 1; // 0-indexed
    } else {
      const now = new Date();
      targetYear = now.getFullYear();
      targetMonth = now.getMonth();
    }

    const startOfMonth = new Date(targetYear, targetMonth, 1);
    const endOfMonth = new Date(targetYear, targetMonth + 1, 1);
    const fiveMonthsAgo = new Date(targetYear, targetMonth - 5, 1);

    const [totalResult, monthResult, count, recentExpenses, monthlyData] =
      await Promise.all([
        Expense.aggregate([
          { $match: { user: userId } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
        Expense.aggregate([
          { $match: { user: userId, date: { $gte: startOfMonth, $lt: endOfMonth } } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
        Expense.countDocuments({ user: userId }),
        Expense.find({ user: userId }).sort('-date').limit(5),
        Expense.aggregate([
          {
            $match: {
              user: userId,
              date: {
                $gte: fiveMonthsAgo,
                $lt: endOfMonth,
              },
            },
          },
          {
            $group: {
              _id: { month: { $month: '$date' }, year: { $year: '$date' } },
              total: { $sum: '$amount' },
            },
          },
          { $sort: { '_id.year': 1, '_id.month': 1 } },
          {
            $project: {
              _id: 0,
              month: '$_id.month',
              year: '$_id.year',
              total: 1,
            },
          },
        ]),
      ]);

    res.json({
      total: totalResult[0]?.total || 0,
      monthTotal: monthResult[0]?.total || 0,
      count,
      recentExpenses,
      monthlyData,
    });
  } catch (err) {
    next(err);
  }
};
