import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/auth.css';

export default function RegisterPage() {
  const formId = useId();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      addToast('Account created successfully', 'success');
      navigate('/dashboard');
    } catch (err) {
      setApiError(
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

        {apiError && <div className="auth-error">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor={`${formId}-name`} className="input-label">
              Name
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              autoComplete="name"
              className={`input-field ${errors.name ? 'input-error' : ''}`}
              placeholder="John Doe"
              {...(() => {
                const { onChange, ...rest } = register('name', { required: 'Name is required' });
                return {
                  ...rest,
                  onChange: (e) => {
                    setApiError('');
                    onChange(e);
                  }
                };
              })()}
            />
            {errors.name && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name.message}</span>}
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor={`${formId}-email`} className="input-label">
              Email
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              autoComplete="email"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
              {...(() => {
                const { onChange, ...rest } = register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Enter a valid email address'
                  }
                });
                return {
                  ...rest,
                  onChange: (e) => {
                    setApiError('');
                    onChange(e);
                  }
                };
              })()}
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
                autoComplete="new-password"
                className={`input-field password-field ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                {...(() => {
                  const { onChange, ...rest } = register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  });
                  return {
                    ...rest,
                    onChange: (e) => {
                      setApiError('');
                      onChange(e);
                    }
                  };
                })()}
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
