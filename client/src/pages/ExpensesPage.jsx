import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import Modal from '../components/Modal';
import { useToast } from '../context/ToastContext';
import useExpenses from '../hooks/useExpenses';
import api from '../services/api';
import '../styles/expenses.css';

const categories = [
  'food',
  'transport',
  'entertainment',
  'utilities',
  'health',
  'shopping',
  'other',
];

export default function ExpensesPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setEditingExpense(null);
      setModalOpen(true);
      searchParams.delete('new');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const { expenses, pagination, loading, refetch } = useExpenses({
    search: debouncedSearch,
    category,
    page,
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleAdd = () => {
    setEditingExpense(null);
    setModalOpen(true);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?'))
      return;
    try {
      await api.delete(`/api/expenses/${id}`);
      addToast('Expense deleted successfully');
      refetch();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete expense', 'error');
    }
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingExpense) {
        await api.put(`/api/expenses/${editingExpense._id}`, data);
        addToast('Expense updated successfully');
      } else {
        await api.post('/api/expenses', data);
        addToast('Expense added successfully');
      }
      setModalOpen(false);
      setEditingExpense(null);
      refetch();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save expense', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <div className="container">
      <div className="expenses-header">
        <h1 className="page-title">Expenses</h1>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Expense
        </button>
      </div>
      {/* Filters */}
      <div className="filters-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expenses..."
            className="search-input"
            aria-label="Search expenses"
          />
        </div>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="category-select"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="card">
        <ExpenseTable
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-ghost"
            style={{ border: '1px solid var(--border-color)' }}
          >
            Previous
          </button>
          <span className="pagination-text">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={page >= pagination.totalPages}
            className="btn btn-ghost"
            style={{ border: '1px solid var(--border-color)' }}
          >
            Next
          </button>
        </div>
      )}
      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingExpense(null);
        }}
        title={editingExpense ? 'Edit Expense' : 'Add Expense'}
      >
        <ExpenseForm
          key={editingExpense?._id || 'new'}
          defaultValues={editingExpense}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setEditingExpense(null);
          }}
          loading={submitting}
        />
      </Modal>
    </div>
  );
}
