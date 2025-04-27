import { useTheme } from '@/context/ThemeContext';
import { useIncidents } from '../context/IncidentContext';
import { motion } from 'framer-motion';

export const FilterControls: React.FC = () => {
  const { filterBySeverity, sortByDate, currentFilter, currentSort } = useIncidents();
  const { theme } = useTheme();

  const severityOptions = ['All', 'Low', 'Medium', 'High'];
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
      <div className="flex md:items-center space-x-4 flex-col gap-3 md:flex-row">
        <span className={`text-sm md:m-auto font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Filter by:</span>
        <div className="flex space-x-2 flex-row">
          {severityOptions.map((severity) => (
            <motion.button
              key={severity}
              whileTap={{ scale: 0.95 }}
              onClick={() => filterBySeverity(severity)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                currentFilter === severity
                  ? `${theme === 'dark' ? 'bg-teal-500 text-white' : 'bg-teal-600 text-white'}`
                  : `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
              }`}
            >
              {severity}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="flex md:items-center space-x-4 flex-col gap-3 md:flex-row">
        <span className={`text-sm md:m-auto font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sort by date:</span>
        <div className="flex space-x-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => sortByDate('desc')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              currentSort === 'desc'
                ? `${theme === 'dark' ? 'bg-teal-500 text-white' : 'bg-teal-600 text-white'}`
                : `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }`}
          >
            Newest First
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => sortByDate('asc')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              currentSort === 'asc'
                ? `${theme === 'dark' ? 'bg-teal-500 text-white' : 'bg-teal-600 text-white'}`
                : `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }`}
          >
            Oldest First
          </motion.button>
        </div>
      </div>
    </div>
  );
};