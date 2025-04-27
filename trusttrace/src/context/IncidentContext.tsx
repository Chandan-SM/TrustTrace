"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Incident } from "../data";
import { initialIncidents } from "../data";
import toast from "react-hot-toast";

interface IncidentContextType {
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, "id" | "reported_at">) => void;
  filterBySeverity: (severity: string) => void;
  sortByDate: (direction: "asc" | "desc") => void;
  filteredIncidents: Incident[];
  currentFilter: string;
  currentSort: "asc" | "desc";
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  setDateRange: (range: {
    startDate: string | null;
    endDate: string | null;
  }) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalPages: number;
  exportData: () => void;
}

const IncidentContext = createContext<IncidentContextType | undefined>(
  undefined
);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [displayedIncidents, setDisplayedIncidents] = useState<Incident[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const [currentSort, setCurrentSort] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    const savedIncidents = sessionStorage.getItem("incidents");
    setTimeout(() => {
      if (savedIncidents) {
        setIncidents(JSON.parse(savedIncidents));
      } else {
        setIncidents(initialIncidents);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Save to sessionStorage whenever incidents change
    if (incidents.length > 0) {
      sessionStorage.setItem("incidents", JSON.stringify(incidents));
    }
  }, [incidents]);

  useEffect(() => {
    // Apply filtering, sorting, and searching
    let filtered = [...incidents];

    // Filter by severity
    if (currentFilter !== "All") {
      filtered = filtered.filter(
        (incident) => incident.severity === currentFilter
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (incident) =>
          incident.title.toLowerCase().includes(term) ||
          incident.description.toLowerCase().includes(term)
      );
    }

    // Filter by date range
    if (dateRange.startDate) {
      const startDate = new Date(dateRange.startDate);
      filtered = filtered.filter(
        (incident) => new Date(incident.reported_at) >= startDate
      );
    }

    if (dateRange.endDate) {
      const endDate = new Date(dateRange.endDate);
      // Set the time to end of day
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (incident) => new Date(incident.reported_at) <= endDate
      );
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return currentSort === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredIncidents(filtered);

    // Reset to first page when filters change
    setCurrentPage(1);

    // Calculate total pages
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [
    incidents,
    currentFilter,
    currentSort,
    searchTerm,
    dateRange,
    itemsPerPage,
  ]);

  useEffect(() => {
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedIncidents(filteredIncidents.slice(startIndex, endIndex));
  }, [filteredIncidents, currentPage, itemsPerPage]);

  const addIncident = (incident: Omit<Incident, "id" | "reported_at">) => {
    const newIncident: Incident = {
      ...incident,
      id: Date.now(),
      reported_at: new Date().toISOString(),
    };

    setIncidents((prev) => [...prev, newIncident]);
    toast.success("New incident reported successfully!");
  };

  const filterBySeverity = (severity: string) => {
    setCurrentFilter(severity);
  };

  const sortByDate = (direction: "asc" | "desc") => {
    setCurrentSort(direction);
  };

  const exportData = () => {
    try {
      // Format the data for CSV
      const headers = [
        "ID",
        "Title",
        "Description",
        "Severity",
        "Reported Date",
      ];

      const csvContent = [
        headers.join(","),
        ...filteredIncidents
        .slice()
        .reverse()
        .map((incident) => {
          const reportedDate = new Date(
            incident.reported_at
          ).toLocaleDateString("en-US");
          return [
            incident.id,
            `"${incident.title.replace(/"/g, '""')}"`, // Escape quotes in CSV
            `"${incident.description.replace(/"/g, '""')}"`,
            incident.severity,
            reportedDate,
          ].join(",");
        }),
      ].join("\n");

      // Create a blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `AI_Safety_Incidents_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Data exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data");
    }
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        addIncident,
        filterBySeverity,
        sortByDate,
        filteredIncidents: displayedIncidents,
        currentFilter,
        currentSort,
        isLoading,
        searchTerm,
        setSearchTerm,
        dateRange,
        setDateRange,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalPages,
        exportData,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (context === undefined) {
    throw new Error("useIncidents must be used within an IncidentProvider");
  }
  return context;
};
