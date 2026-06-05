import { Home, LogOut, Menu, Moon, Receipt, Sun, IndianRupee, X } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/app-layout.css';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'SELECT'
      ) {
        return;
      }
      if (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'n') {
        e.preventDefault();
        navigate('/expenses?new=true');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <div className="app-container">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-logo">
            <IndianRupee size={24} color="var(--accent-color)" />
            <span>ExpenseTracker</span>
          </h1>
          <button 
            className="sidebar-close-btn" 
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={navLinkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Home size={20} />
            Dashboard
          </NavLink>
          <NavLink
            to="/expenses"
            className={navLinkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Receipt size={20} />
            Expenses
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-details">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
            </div>
            <button onClick={logout} className="logout-btn" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="header">
          <button onClick={() => setSidebarOpen(true)} className="menu-toggle">
            <Menu size={24} />
          </button>
          <div className="header-spacer" />
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="main-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
