import { Link } from 'react-router-dom';
import { IndianRupee, Zap, Shield, Sparkles } from 'lucide-react';
import '../styles/landing.css';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="orb-1"></div>
      <div className="orb-2"></div>

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

      <main className="hero-section">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Your Personal Finance Hub
        </div>
        <h1 className="hero-title text-gradient">
          Track your expenses.<br />
          Understand your money.
        </h1>
        <p className="hero-subtitle">
          A clean, fast, and simple tool to log your daily expenses, visualize your spending habits, and stay in control of your budget.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="btn btn-primary btn-large">
            Create an Account
          </Link>
          <Link to="/login" className="btn btn-ghost btn-large">
            Sign In
          </Link>
        </div>
      </main>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Zap size={24} />
            </div>
            <h3 className="feature-title">Quick Logging</h3>
            <p className="feature-desc">
              Add new expenses in seconds with categorized tags so you never lose track of where your money went.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Sparkles size={24} />
            </div>
            <h3 className="feature-title">Visual Insights</h3>
            <p className="feature-desc">
              View automatic breakdowns and charts of your spending habits across different categories over time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Shield size={24} />
            </div>
            <h3 className="feature-title">Private by Design</h3>
            <p className="feature-desc">
              Your financial logs are encrypted and securely tied to your personal account. Only you can view your data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
