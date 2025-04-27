import { useTheme } from "@/context/ThemeContext";
import { useIncidents } from "../context/IncidentContext";
import { CalendarIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const DateRangeFilter: React.FC = () => {
  const { dateRange, setDateRange } = useIncidents();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleClearFilters = () => {
    setDateRange({ startDate: null, endDate: null });
    setIsOpen(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
          theme === "dark"
            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        } transition-colors`}
      >
        <CalendarIcon size={18} />
        <span className="text-sm font-medium">{"Filter by Date"}</span>
        {(dateRange.startDate || dateRange.endDate) && (
          <XIcon
            size={16}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleClearFilters();
            }}
          />
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mt-2 p-4 rounded-md shadow-lg z-10 w-full absolute border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="start-date"
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="start-date"
                  max={dateRange.endDate || today}
                  value={dateRange.startDate || ""}
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      startDate: e.target.value || null,
                    })
                  }
                  className={`w-full p-2 pl-3 pr-3 border rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
                <label
                  htmlFor="start-date"
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => {
                    (
                      document.getElementById("start-date") as HTMLInputElement
                    )?.showPicker();
                  }}
                ></label>
              </div>
            </div>

            <div>
              <label
                htmlFor="end-date"
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="end-date"
                  min={dateRange.startDate || ""}
                  max={today}
                  value={dateRange.endDate || ""}
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      endDate: e.target.value || null,
                    })
                  }
                  className={`w-full p-2 pl-3 pr-3 border rounded-md cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
                <label
                  htmlFor="end-date"
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => {
                    (
                      document.getElementById("end-date") as HTMLInputElement
                    )?.showPicker();
                  }}
                ></label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClearFilters}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  theme === "dark"
                    ? "bg-teal-600 text-white hover:bg-teal-500"
                    : "bg-teal-600 text-white hover:bg-teal-500"
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
