import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 cursor-pointer"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <AnimatePresence mode="wait">
                {theme === 'light' ? (
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MoonIcon size={20} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SunIcon size={20} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};