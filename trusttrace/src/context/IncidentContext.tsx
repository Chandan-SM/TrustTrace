"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Incident } from '../data';
import { initialIncidents } from '../data';
import toast from 'react-hot-toast';

interface IncidentContextType {
    incidents: Incident[];
    addIncident: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
    filterBySeverity: (severity: string) => void;
    sortByDate: (direction: 'asc' | 'desc') => void;
    filteredIncidents: Incident[];
    currentFilter: string;
    currentSort: 'asc' | 'desc';
    isLoading: boolean;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
    const [currentFilter, setCurrentFilter] = useState<string>('All');
    const [currentSort, setCurrentSort] = useState<'asc' | 'desc'>('desc');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate loading data
        setIsLoading(true);
        const savedIncidents = sessionStorage.getItem('incidents');
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
            sessionStorage.setItem('incidents', JSON.stringify(incidents));
        }
    }, [incidents]);

    useEffect(() => {
        // Apply filtering and sorting
        let filtered = [...incidents];
        
        if (currentFilter !== 'All') {
            filtered = filtered.filter(incident => incident.severity === currentFilter);
        }
        
        filtered.sort((a, b) => {
            const dateA = new Date(a.reported_at).getTime();
            const dateB = new Date(b.reported_at).getTime();
            return currentSort === 'asc' ? dateA - dateB : dateB - dateA;
        });
        
        setFilteredIncidents(filtered);
    }, [incidents, currentFilter, currentSort]);

    const addIncident = (incident: Omit<Incident, 'id' | 'reported_at'>) => {
        const newIncident: Incident = {
            ...incident,
            id: Date.now(),
            reported_at: new Date().toISOString()
        };
        
        setIncidents(prev => [...prev, newIncident]);
        toast.success('New incident reported successfully!');
    };

    const filterBySeverity = (severity: string) => {
        setCurrentFilter(severity);
    };

    const sortByDate = (direction: 'asc' | 'desc') => {
        setCurrentSort(direction);
    };

    return (
        <IncidentContext.Provider value={{
            incidents,
            addIncident,
            filterBySeverity,
            sortByDate,
            filteredIncidents,
            currentFilter,
            currentSort,
            isLoading
        }}>
            {children}
        </IncidentContext.Provider>
    );
};

export const useIncidents = () => {
    const context = useContext(IncidentContext);
    if (context === undefined) {
        throw new Error('useIncidents must be used within an IncidentProvider');
    }
    return context;
};