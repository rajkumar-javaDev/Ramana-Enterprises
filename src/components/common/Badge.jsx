import React from 'react';
import { cn } from '../../utils/cn';

export default function Badge({
  children,
  variant = 'gold',
  size = 'md',
  icon: Icon,
  className
}) {
  const baseStyles = "inline-flex items-center font-bold uppercase tracking-wider rounded-full";

  const variants = {
    gold: "bg-gold-50 text-gold-700 border border-gold-200",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    slate: "bg-slate-100 text-slate-700 border border-slate-200",
    white: "bg-white text-slate-900 border border-slate-200 shadow-soft-sm",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-xs sm:text-sm",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {Icon && <Icon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
