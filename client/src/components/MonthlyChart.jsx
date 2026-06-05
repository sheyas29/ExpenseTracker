import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatTooltip(value, name, props) {
  return [`₹${Number(value).toFixed(2)}`, 'Spent'];
}

export default function MonthlyChart({ data = [] }) {
  const [chartType, setChartType] = useState('bar');

  const monthlyData = useMemo(() => {
    if (!data.length) return [];
    const grouped = {};
    data.forEach((exp) => {
      const date = new Date(exp.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          name: monthNames[date.getMonth()],
          total: 0,
          timestamp: date.getTime(),
        };
      }
      grouped[monthKey].total += exp.amount;
    });
    return Object.values(grouped).sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);

  if (!data.length) {
    return (
      <div className="chart-container flex items-center justify-center">
        <p className="empty-state">No data available</p>
      </div>
    );
  }

  const renderChart = () => {
    const ChartComponent = chartType === 'line' ? LineChart : BarChart;

    return (
      <ResponsiveContainer width="100%" height={250}>
        <ChartComponent
          data={monthlyData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
            stroke="transparent"
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
            stroke="transparent"
            width={50}
          />
          <Tooltip
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: 'var(--surface-color)',
              borderColor: 'var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
            itemStyle={{ color: 'var(--text-primary)' }}
          />
          {chartType === 'line' ? (
            <Line
              type="monotone"
              dataKey="total"
              stroke="var(--accent-color)"
              strokeWidth={3}
              dot={{ r: 4, fill: 'var(--accent-color)', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          ) : (
            <Bar
              dataKey="total"
              fill="var(--accent-color)"
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-controls" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setChartType('bar')}
          className={`btn ${chartType === 'bar' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
        >
          Bar
        </button>
        <button
          onClick={() => setChartType('line')}
          className={`btn ${chartType === 'line' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
        >
          Line
        </button>
      </div>
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
}
