import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/auth.css';

export default function RegisterPage() {
  const formId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(name, email, password);
      addToast('Account created successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            <IndianRupee size={28} style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--accent-color)' }} />
            ExpenseTracker
          </h1>
          <p className="auth-subtitle">Create an account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor={`${formId}-name`} className="input-label">
              Name
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              required
              autoComplete="name"
              className="input-field"
              placeholder="John Doe"
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor={`${formId}-email`} className="input-label">
              Email
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              required
              autoComplete="email"
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor={`${formId}-password`} className="input-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                id={`${formId}-password`}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                required
                minLength={6}
                autoComplete="new-password"
                className="input-field password-field"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary auth-submit-btn"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
