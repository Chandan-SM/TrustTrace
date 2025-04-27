'use client';
import { IncidentCard } from './IncidentCard';
import { FilterControls } from './FilterControls';
import { IncidentForm } from './IncidentForm';
import { useIncidents } from '../context/IncidentContext';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { AlertCircleIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const Dashboard: React.FC = () => {
  const { filteredIncidents, isLoading } = useIncidents();
  const { theme } = useTheme();
  
  return (
    <div className={`h-[100%] transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`${theme === 'dark' ? 'bg-teal-900' : 'bg-teal-700'} text-white shadow-md fixed w-full h-[5rem] flex items-center`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">AI Safety Incident Dashboard</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 pt-[7rem] py-8 min-h-screen">
        <IncidentForm />
        
        <div className={`rounded-lg shadow-md p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Reported Incidents</h2>
          
          <FilterControls />
          
          <div className="mt-6">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center h-[60vh]"
              >
                <div className="loader border-t-teal-500 border-4 w-8 h-8 rounded-full animate-spin mb-3"></div>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Loading incidents...</p>
              </motion.div>
            ) : (
              filteredIncidents.length > 0 ? (
                filteredIncidents.map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <AlertCircleIcon size={48} className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} mb-3`} />
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No incidents found matching your filters.</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </main>
      
    <footer className={`py-4 border-t ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
      <div className="container mx-auto px-4 text-center text-sm">
        &copy; 2025 HumanChain AI Safety Team
      </div>
    </footer>
    </div>
  );
};