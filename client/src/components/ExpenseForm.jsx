import { useId } from 'react';
import { useForm } from 'react-hook-form';

const categories = [
  'food',
  'transport',
  'entertainment',
  'utilities',
  'health',
  'shopping',
  'other',
];

export default function ExpenseForm({
  defaultValues,
  onSubmit,
  onCancel,
  loading,
}) {
  const formId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues?.title || '',
      amount: defaultValues?.amount || '',
      category: defaultValues?.category || '',
      date: defaultValues?.date
        ? new Date(defaultValues.date).toISOString().split('T')[0]
        : (() => {
            const d = new Date();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          })(),
      notes: defaultValues?.notes || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <label htmlFor={`${formId}-title`} className="input-label">
          Title
        </label>
        <input
          id={`${formId}-title`}
          {...register('title', { required: 'Title is required' })}
          className="input-field"
          placeholder="e.g. Grocery shopping"
          autoFocus
        />
        {errors.title && (
          <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor={`${formId}-amount`} className="input-label">
          Amount (₹)
        </label>
        <input
          id={`${formId}-amount`}
          type="number"
          step="0.01"
          {...register('amount', {
            required: 'Amount is required',
            valueAsNumber: true,
            min: { value: 0.01, message: 'Must be greater than 0' },
          })}
          className="input-field"
          placeholder="0.00"
        />
        {errors.amount && (
          <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>
            {errors.amount.message}
          </p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor={`${formId}-category`} className="input-label">
          Category
        </label>
        <select
          id={`${formId}-category`}
          {...register('category', { required: 'Category is required' })}
          className="input-field"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && (
          <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor={`${formId}-date`} className="input-label">
          Date
        </label>
        <input
          id={`${formId}-date`}
          type="date"
          {...register('date', { required: 'Date is required' })}
          className="input-field"
        />
        {errors.date && (
          <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>
            {errors.date.message}
          </p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor={`${formId}-notes`} className="input-label">
          Notes
        </label>
        <textarea
          id={`${formId}-notes`}
          {...register('notes')}
          rows={3}
          className="input-field"
          style={{ resize: 'none' }}
          placeholder="Optional notes..."
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          marginTop: '1.5rem',
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost"
          style={{ border: '1px solid var(--border-color)' }}
        >
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
