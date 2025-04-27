"use client";
import { useState } from 'react';
import { Incident } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface IncidentCardProps {
    incident: Incident;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { theme } = useTheme();
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    const getSeverityColor = (severity: string) => {
        switch(severity) {
            case 'Low': return theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800';
            case 'Medium': return theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800';
            case 'High': return theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800';
            default: return theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-lg shadow-md overflow-hidden mb-4 border`}
        >
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                            {incident.title}
                        </h3>
                        <div className="flex items-center mt-2 space-x-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(incident.severity)}`}>
                                {incident.severity}
                            </span>
                            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                                {formatDate(incident.reported_at)}
                            </span>
                        </div>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`p-2 ${
                            theme === 'dark' ? 'text-teal-400 hover:bg-teal-900/30' : 'text-teal-600 hover:bg-teal-50'
                        } rounded-full`}
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                        {isExpanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
                    </motion.button>
                </div>
                
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 overflow-hidden"
                        >
                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                {incident.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};