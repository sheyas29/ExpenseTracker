import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/auth.css';

export default function LoginPage() {
  const formId = useId();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      addToast('Logged in successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Login failed. Please try again.'
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
          <p className="auth-subtitle">Welcome back</p>
        </div>

        {apiError && <div className="auth-error">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor={`${formId}-email`} className="input-label">
              Email
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Enter a valid email address'
                }
              })}
              autoComplete="email"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
              onChange={() => setApiError('')}
            />
            {errors.email && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email.message}</span>}
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor={`${formId}-password`} className="input-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                id={`${formId}-password`}
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                autoComplete="current-password"
                className={`input-field password-field ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                onChange={() => setApiError('')}
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
            {errors.password && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary auth-submit-btn"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
