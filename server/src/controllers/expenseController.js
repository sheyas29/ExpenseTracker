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
      query.title = { $regex: search, $options: 'i' };
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
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Run aggregations in parallel
    const [totalResult, monthResult, count, recentExpenses, monthlyData] =
      await Promise.all([
        Expense.aggregate([
          { $match: { user: userId } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
        Expense.aggregate([
          { $match: { user: userId, date: { $gte: startOfMonth } } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
        Expense.countDocuments({ user: userId }),
        Expense.find({ user: userId }).sort('-date').limit(5),
        Expense.aggregate([
          {
            $match: {
              user: userId,
              date: {
                $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
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
