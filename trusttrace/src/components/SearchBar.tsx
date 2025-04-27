import { useTheme } from "@/context/ThemeContext";
import { useIncidents } from "../context/IncidentContext";
import { SearchIcon, XIcon } from "lucide-react";

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useIncidents();
  const { theme } = useTheme();

  return (
    <div className={`relative md:w-[47%] lg:w-[61%] xl:w-[69%] 2xl:w-[75%]`}>
      <div className={`relative flex items-center`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon
            size={18}
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
        </div>
        <input
          type="text"
          placeholder="Search incidents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 pr-10 py-2 w-full rounded-md border ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <XIcon
              size={18}
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};
