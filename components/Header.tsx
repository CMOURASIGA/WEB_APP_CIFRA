import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-brand-dark text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-white text-brand-dark w-8 h-8 flex items-center justify-center rounded-lg font-mono text-lg">C#</span>
          <span>CifraFlow</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link 
            to="/library" 
            className={`${isActive('/library') ? 'text-brand-accent' : 'text-gray-300 hover:text-white'} transition-colors`}
          >
            Library
          </Link>
          <Link 
            to="/lists" 
            className={`${isActive('/lists') ? 'text-brand-accent' : 'text-gray-300 hover:text-white'} transition-colors`}
          >
            Lists
          </Link>
          <Link 
            to="/settings" 
            className={`${isActive('/settings') ? 'text-brand-accent' : 'text-gray-300 hover:text-white'} transition-colors`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;