import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ReceiptCardProps {
  title: string;
  metric: string;
  subtitle: string;
  trend: 'up' | 'down';
  color: 'violet' | 'amber' | 'teal';
  chartData?: number[];
  icon?: React.ReactNode;
}

const colorMap = {
  violet: '#7C3AED',
  amber: '#F59E0B',
  teal: '#14B8A6',
};

export function ReceiptCard({ title, metric, subtitle, trend, color, chartData, icon }: ReceiptCardProps) {
  const accentColor = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="receipt-card"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-[#6B7280] mb-1 uppercase tracking-wide font-mono">
            {title}
          </div>
          <div className="text-2xl text-[#111827]" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
            {metric}
          </div>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: accentColor }}>
          {icon || (trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />)}
        </div>
      </div>

      {chartData && (
        <div className="flex items-end gap-1 h-12 mb-2">
          {chartData.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1 + idx * 0.05, duration: 0.3 }}
              className="flex-1 rounded-t"
              style={{
                height: `${(value / Math.max(...chartData)) * 100}%`,
                backgroundColor: idx === chartData.length - 1 ? accentColor : '#E5E7EB',
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      )}

      <div className="text-xs text-[#6B7280]">
        {subtitle}
      </div>
    </motion.div>
  );
}
