'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="ops-surface p-6 hover-lift focus-within:ring-2 focus-within:ring-blue-500 relative overflow-hidden border-l-4 border-l-blue-600"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.24 }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600/80" />
      <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-navy-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
