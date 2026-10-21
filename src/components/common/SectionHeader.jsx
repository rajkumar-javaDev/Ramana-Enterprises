import React from 'react';
import Badge from './Badge';
import { cn } from '../../utils/cn';

export default function SectionHeader({
  badgeText,
  badgeVariant = 'gold',
  title,
  subtitle,
  centered = true,
  className
}) {
  return (
    <div className={cn("max-w-3xl mb-12 sm:mb-16", centered ? "mx-auto text-center" : "", className)}>
      {badgeText && (
        <div className="mb-3">
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
