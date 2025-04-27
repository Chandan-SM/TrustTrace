import { useTheme } from "@/context/ThemeContext";
import { useIncidents } from "../context/IncidentContext";
import { DownloadIcon } from "lucide-react";
import { motion } from "framer-motion";

export const ExportButton: React.FC = () => {
  const { exportData } = useIncidents();
  const { theme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={exportData}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md shadow-sm ${
        theme === "dark"
          ? "bg-teal-800 hover:bg-teal-700 text-white"
          : "bg-teal-600 hover:bg-teal-700 text-white"
      } transition-colors`}
    >
      <DownloadIcon size={18} />
      <span className="text-sm font-medium">Export to CSV</span>
    </motion.button>
  );
};
