import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  getStats,
  updateExpense,
} from '../controllers/expenseController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', getExpenses);
router.get('/stats', getStats);
router.get('/:id', getExpense);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
