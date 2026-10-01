import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  padding?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  padding,
  style,
  ...props
}) => {
  const paddingClass = padding ? '' : 'p-5 md:p-6';

  return (
    <div
      className={`bg-white rounded-2xl border border-[#D6E1DE] shadow-xs ${paddingClass} transition-all duration-200 ${
        hoverEffect ? 'hover:border-[#16A085]/40 hover:shadow-md' : ''
      } ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};
