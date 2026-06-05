import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Calendar, FileText } from 'lucide-react';
import MonthlyChart from '../components/MonthlyChart';
import StatCard from '../components/StatCard';
import useExpenses from '../hooks/useExpenses';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const navigate = useNavigate();

  const { expenses, loading } = useExpenses({ limit: 1000 });

  const { total, monthly, recent } = useMemo(() => {
    if (!expenses) return { total: 0, monthly: 0, recent: [] };

    const [yearStr, monthStr] = selectedMonth.split('-');
    const currentMonth = parseInt(monthStr, 10) - 1;
    const currentYear = parseInt(yearStr, 10);

    const stats = expenses.reduce(
      (acc, curr) => {
        acc.total += curr.amount;
        const expDate = new Date(curr.date);
        if (
          expDate.getMonth() === currentMonth &&
          expDate.getFullYear() === currentYear
        ) {
          acc.monthly += curr.amount;
        }
        return acc;
      },
      { total: 0, monthly: 0 }
    );

    return { ...stats, recent: expenses.slice(0, 5) };
  }, [expenses, selectedMonth]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '1.5rem' }}>
        <div className="empty-state">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Overview</h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="input-field"
          aria-label="Select month"
          style={{ width: 'auto', marginBottom: 0, padding: '0.25rem 0.5rem' }}
        />
      </div>

      <div className="stats-grid">
        <StatCard title="Total Expenses" value={total} icon={<Wallet size={20} color="var(--accent-color)" />} />
        <StatCard title="Monthly Spending" value={monthly} icon={<Calendar size={20} color="var(--accent-color)" />} />
      </div>

      <div className="card chart-section">
        <h2 className="section-title">Spending Analytics</h2>
        <MonthlyChart data={expenses} />
      </div>

      <div className="card">
        <h2 className="section-title">Recent Transactions</h2>
        {recent.length === 0 ? (
          <div className="empty-state">
            <FileText size={40} color="var(--text-secondary)" style={{ opacity: 0.5 }} />
            <p style={{ margin: 0 }}>No recent transactions.</p>
            <button onClick={() => navigate('/expenses?new=true')} className="btn btn-primary">
              Add your first expense
            </button>
          </div>
        ) : (
          <div className="transactions-list">
            {recent.map((exp) => (
              <div key={exp._id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-details">
                    <p className="transaction-name">{exp.title}</p>
                    <p className="transaction-date">
                      {new Date(exp.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="transaction-meta">
                  <span className={`badge badge-${exp.category}`}>
                    {exp.category}
                  </span>
                  <span className="transaction-amount text-primary">
                    ₹{exp.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
