import React from 'react';

export interface PageHeaderProps {
  title: string;
  tagline?: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  tagline,
  subtitle,
  badgeText,
  actions,
}) => {
  const displaySubtitle = tagline || subtitle;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-[#D6E1DE]">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#10213A] tracking-tight">
            {title}
          </h1>
          {badgeText && (
            <span className="bg-[#E8F5F1] text-[#16A085] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#16A085]/20">
              {badgeText}
            </span>
          )}
        </div>
        {displaySubtitle && <p className="text-xs md:text-sm text-[#536477] mt-1">{displaySubtitle}</p>}
      </div>

      {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
    </div>
  );
};
