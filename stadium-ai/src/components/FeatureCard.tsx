import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100/80 hover-lift focus-within:ring-2 focus-within:ring-blue-500">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-navy-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
