import { useTheme } from "@/context/ThemeContext";
import { useIncidents } from "../context/IncidentContext";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";

export const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage, totalPages } = useIncidents();
  const { theme } = useTheme();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageItems = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
    // eslint-disable-next-line prefer-const
    let endPage = Math.min(totalPages, startPage + maxPageItems - 1);

    if (endPage - startPage + 1 < maxPageItems) {
      startPage = Math.max(1, endPage - maxPageItems + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-6 space-x-1">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1
            ? `${
                theme === "dark" ? "text-gray-600" : "text-gray-400"
              } cursor-not-allowed`
            : `${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`
        }`}
        aria-label="Previous page"
      >
        <ChevronLeftIcon size={20} />
      </motion.button>

      {getPageNumbers().map((page) => (
        <motion.button
          key={page}
          whileTap={{ scale: 0.95 }}
          onClick={() => goToPage(page)}
          className={`w-8 h-8 rounded-md ${
            currentPage === page
              ? `${
                  theme === "dark"
                    ? "bg-teal-600 text-white"
                    : "bg-teal-600 text-white"
                }`
              : `${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-200"
                }`
          }`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? `${
                theme === "dark" ? "text-gray-600" : "text-gray-400"
              } cursor-not-allowed`
            : `${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`
        }`}
        aria-label="Next page"
      >
        <ChevronRightIcon size={20} />
      </motion.button>
    </div>
  );
};
