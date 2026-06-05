import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export default function useExpenses({
  search = '',
  category = '',
  page = 1,
  limit = 10,
} = {}) {
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (category) params.category = category;

      const res = await api.get('/api/expenses', { params });
      setExpenses(res.data.expenses);
      const p = res.data.pagination;
      setPagination({
        page: p.page,
        totalPages: p.pages,
        total: p.total,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, [search, category, page, limit]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return { expenses, pagination, loading, error, refetch: fetchExpenses };
}
