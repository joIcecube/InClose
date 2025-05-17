import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  tooltip?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  trend = 'up',
  tooltip,
  delay = 0
}) => {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-dark-lighter/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-neon-green transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-dark rounded-lg group-hover:bg-neon-green group-hover:text-dark transition-all duration-300">
          {icon}
        </div>
        {change && (
          <div className={`flex items-center ${trend === 'up' ? 'text-neon-green' : 'text-error'}`}>
            <ArrowUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold group-hover:text-neon-green transition-colors duration-300">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </motion.div>
  );

  if (tooltip) {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {card}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="bg-dark-lighter px-4 py-2 rounded-lg border border-gray-800 text-sm"
              sideOffset={5}
            >
              {tooltip}
              <Tooltip.Arrow className="fill-gray-800" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return card;
};

export default StatCard;