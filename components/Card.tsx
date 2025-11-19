import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  to?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, icon, to, className = "", onClick, children }) => {
  const content = (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full flex flex-col ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-brand-primary text-2xl">{icon}</div>}
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="block h-full">{content}</Link>;
  }

  return <div onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>{content}</div>;
};

export default Card;