interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  color?: 'blue' | 'red' | 'green' | 'purple' | 'yellow';
}

const colorClasses: Record<string, { text: string }> = {
  blue: { text: 'text-blue-600' },
  red: { text: 'text-red-600' },
  green: { text: 'text-green-600' },
  purple: { text: 'text-blue-700' },
  yellow: { text: 'text-yellow-600' },
};

const bgSubtle = {
  blue: 'bg-blue-50/80 border-blue-100',
  red: 'bg-red-50/80 border-red-100',
  green: 'bg-green-50/80 border-green-100',
  purple: 'bg-blue-50/80 border-blue-100',
  yellow: 'bg-yellow-50/80 border-yellow-100',
};

export function StatCard({ label, value, icon, trend, color = 'blue' }: StatCardProps) {
  const trendColors = { up: 'text-green-700', down: 'text-red-700', stable: 'text-gray-500' };
  const styles = colorClasses[color] || colorClasses.blue;

  return (
    <div className="ops-surface rounded-lg p-5 hover-lift">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
          <p className={`text-3xl font-black tracking-tight ${styles.text}`}>{value}</p>
          {trend && (
            <span className={`text-xs font-semibold ${trendColors[trend]} flex items-center gap-1 mt-1`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'Stable'}
            </span>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-md flex items-center justify-center border shadow-inner ${bgSubtle[color]} ${styles.text}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
