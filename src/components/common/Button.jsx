import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  className,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 active:scale-95 shadow-soft-sm cursor-pointer";

  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-800 shadow-soft-md",
    emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-soft-md",
    gold: "bg-gold-500 text-slate-950 hover:bg-gold-600",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200",
    outline: "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50",
    white: "bg-white text-slate-900 hover:bg-slate-100 shadow-soft-md",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-3 text-xs sm:text-sm",
    lg: "px-8 py-4 text-sm sm:text-base",
  };

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2 flex-shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2 flex-shrink-0" />}
    </>
  );

  if (to) {
    return <Link to={to} className={combinedClasses} {...props}>{content}</Link>;
  }

  if (href) {
    return <a href={href} className={combinedClasses} {...props}>{content}</a>;
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
