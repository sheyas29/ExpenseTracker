import { useState, useEffect } from 'react';

export default function StatCard({ title, value, icon }) {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 400);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div className="card stat-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <h3 className="stat-title">{title}</h3>
      </div>
      <p className={`stat-value ${highlight ? 'value-highlight' : ''}`}>
        {typeof value === 'number' && (title.includes('Balance') || title.includes('Spending') || title.includes('Expenses'))
          ? `₹${value.toFixed(2)}`
          : value}
      </p>
    </div>
  );
}
