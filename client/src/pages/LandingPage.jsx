import { Link } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';
import '../styles/landing.css';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="landing-brand">
          <IndianRupee className="landing-brand-icon" size={28} />
          <span>ExpenseTracker</span>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-ghost">Sign in</Link>
          <Link to="/register" className="btn btn-primary">Get started</Link>
        </div>
      </nav>

      <main className="hero-section" style={{ padding: '8rem 1rem' }}>
        <h1 className="hero-title" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Expense Tracker
        </h1>
        <p className="hero-subtitle" style={{ marginBottom: '2.5rem', maxWidth: '520px' }}>
          A clean, fast, and minimal ledger to log your daily transactions, monitor your categories, and track your budget.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="btn btn-primary btn-large">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-ghost btn-large" style={{ border: '1px solid var(--border-color)' }}>
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
