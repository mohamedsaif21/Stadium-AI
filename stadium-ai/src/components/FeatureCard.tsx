import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="ops-surface rounded-lg p-6 hover-lift focus-within:ring-2 focus-within:ring-blue-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600/80" />
      <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center mb-5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-navy-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
