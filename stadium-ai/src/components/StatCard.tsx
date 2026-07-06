interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  color?: 'blue' | 'red' | 'green' | 'purple' | 'yellow';
}

const colorClasses: Record<string, { text: string; icon: string }> = {
  blue: { text: 'text-blue-600', icon: 'text-blue-200' },
  red: { text: 'text-red-600', icon: 'text-red-200' },
  green: { text: 'text-green-600', icon: 'text-green-200' },
  purple: { text: 'text-purple-600', icon: 'text-purple-200' },
  yellow: { text: 'text-yellow-600', icon: 'text-yellow-200' },
};

export function StatCard({ label, value, icon, trend, color = 'blue' }: StatCardProps) {
  const trendColors = { up: 'text-green-600 font-semibold', down: 'text-red-600 font-semibold', stable: 'text-gray-400 font-medium' };
  const styles = colorClasses[color] || colorClasses.blue;

  const bgSubtle = {
    blue: 'bg-blue-50/80',
    red: 'bg-red-50/80',
    green: 'bg-green-50/80',
    purple: 'bg-purple-50/80',
    yellow: 'bg-yellow-50/80',
  }[color];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover-lift">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
          <p className={`text-3xl font-bold tracking-tight ${styles.text}`}>{value}</p>
          {trend && (
            <span className={`text-xs ${trendColors[trend]} flex items-center gap-1 mt-1`}>
              {trend === 'up' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />}
              {trend === 'down' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trend === 'stable' && '→'}
              {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'Stable'}
            </span>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-inner ${bgSubtle} ${styles.text}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
