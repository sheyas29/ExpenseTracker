import { Search } from 'lucide-react';

export default function ExpenseTable({ expenses, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="empty-state">
        <p>Loading expenses...</p>
      </div>
    );
  }

  if (!expenses?.length) {
    return (
      <div className="empty-state">
        <Search size={40} color="var(--text-secondary)" style={{ opacity: 0.5 }} />
        <p style={{ margin: 0 }}>No expenses found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td style={{ whiteSpace: 'nowrap' }}>
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td style={{ fontWeight: 500 }}>{expense.title}</td>
              <td>
                <span className={`badge badge-${expense.category}`}>
                  {expense.category}
                </span>
              </td>
              <td
                style={{
                  textAlign: 'right',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}
              >
                ₹{expense.amount.toFixed(2)}
              </td>
              <td>
                <div
                  className="table-actions"
                  style={{ justifyContent: 'flex-end' }}
                >
                  <button
                    onClick={() => onEdit(expense)}
                    className="btn btn-ghost"
                    style={{ padding: '0.25rem 0.5rem' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense._id)}
                    className="btn btn-ghost"
                    style={{
                      padding: '0.25rem 0.5rem',
                      color: 'var(--danger-color)',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
