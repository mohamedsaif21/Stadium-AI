import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'success' | 'danger' | 'ghost';
};

const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md shadow-blue-600/15',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md shadow-green-600/15',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md shadow-red-600/15',
  ghost: 'bg-white/10 text-white hover:bg-white/20 focus:ring-white border border-white/10',
};

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100 focus:outline-none focus:ring-2 ${buttonVariants[variant]} ${className}`}
      {...props}
    />
  );
}

type FieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className = '', ...props }: FieldProps) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label htmlFor={inputId} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50 focus:bg-white ${className}`}
        {...props}
      />
      {error && <p id={`${inputId}-error`} className="mt-1.5 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}

export function Badge({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    red: 'bg-red-50 text-red-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${tones[tone]}`}>{children}</span>;
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-dashed border-gray-200 text-center">
      <div className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3" aria-hidden="true">
        <span className="text-lg">✓</span>
      </div>
      <p className="text-gray-700 text-sm font-semibold">{title}</p>
      {description && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{description}</p>}
    </div>
  );
}
