import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `relative font-medium transition-all duration-300
     ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
     after:absolute after:-bottom-1 after:left-0 after:h-[2px]
     after:bg-blue-600 after:transition-all after:duration-300
     ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform"
        >
          🎉 EventPoll
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/events/create" className={navLinkClass}>
                Create Event
              </NavLink>

              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-red-500 to-red-600
                           hover:from-red-600 hover:to-red-700
                           shadow-md hover:shadow-lg
                           transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-5 py-2 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-blue-600 to-purple-600
                           hover:from-blue-700 hover:to-purple-700
                           shadow-md hover:shadow-lg
                           transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200 px-6 py-4 space-y-4">
          {user ? (
            <>
              <NavLink onClick={() => setOpen(false)} to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <NavLink onClick={() => setOpen(false)} to="/events/create" className={navLinkClass}>
                Create Event
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full text-left font-semibold text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink onClick={() => setOpen(false)} to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink onClick={() => setOpen(false)} to="/signup" className={navLinkClass}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
