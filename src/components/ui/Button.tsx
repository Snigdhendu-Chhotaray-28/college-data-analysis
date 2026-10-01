import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs md:text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#16A085] text-white hover:bg-[#138d75] shadow-xs active:scale-[0.99]',
    secondary: 'bg-[#0B1F3A] text-white hover:bg-[#142B4A] shadow-xs active:scale-[0.99]',
    outline: 'border border-[#D6E1DE] bg-white text-[#10213A] hover:bg-[#F4F7F6] hover:border-slate-300',
    danger: 'bg-[#D64550] text-white hover:bg-[#b83540] shadow-xs',
    ghost: 'text-[#536477] hover:bg-[#E8F5F1] hover:text-[#16A085]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
