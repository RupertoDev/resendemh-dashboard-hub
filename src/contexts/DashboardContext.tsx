
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Dashboard {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  iframeUrl: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
  width?: number;
  height?: number;
}

interface DashboardContextType {
  dashboards: Dashboard[];
  categories: string[];
  departments: string[];
  addDashboard: (dashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDashboard: (id: string, updates: Partial<Dashboard>) => void;
  deleteDashboard: (id: string) => void;
  getFilteredDashboards: (category?: string, department?: string) => Dashboard[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Mock dashboards data
const initialDashboards: Dashboard[] = [
  {
    id: '1',
    title: 'Análise de Dados - Setor Inicial',
    description: 'Dashboard principal com métricas do setor inicial para 2025',
    category: 'Vendas',
    department: 'Vendas',
    iframeUrl: 'https://app.fabric.microsoft.com/view?r=eyJrIjoiMTVmNmU0NjItN2M5Yy00YzE3LWFmMWItOWI2YmVhM2U0MzgxIiwidCI6IjE0NjIzN2ZkLTU5MWYtNDVhMC1iM2VkLTA3NzNjMjdlODczZCJ9',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'admin@resendemh.com.br',
    isActive: true,
    width: 1200,
    height: 750
  },
  {
    id: '2',
    title: 'Relatório Financeiro',
    description: 'Visão geral das métricas financeiras da empresa',
    category: 'Financeiro',
    department: 'Financeiro',
    iframeUrl: 'https://app.powerbi.com/view?r=demo-financial',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20'),
    createdBy: 'maria.santos@resendemh.com.br',
    isActive: true,
    width: 1200,
    height: 600
  }
];

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>(initialDashboards);

  const categories = Array.from(new Set(dashboards.map(d => d.category)));
  const departments = Array.from(new Set(dashboards.map(d => d.department)));

  const addDashboard = (newDashboard: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const dashboard: Dashboard = {
      ...newDashboard,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setDashboards(prev => [...prev, dashboard]);
  };

  const updateDashboard = (id: string, updates: Partial<Dashboard>) => {
    setDashboards(prev => 
      prev.map(dashboard => 
        dashboard.id === id 
          ? { ...dashboard, ...updates, updatedAt: new Date() }
          : dashboard
      )
    );
  };

  const deleteDashboard = (id: string) => {
    setDashboards(prev => prev.filter(dashboard => dashboard.id !== id));
  };

  const getFilteredDashboards = (category?: string, department?: string) => {
    return dashboards.filter(dashboard => {
      if (!dashboard.isActive) return false;
      if (category && dashboard.category !== category) return false;
      if (department && dashboard.department !== department) return false;
      return true;
    });
  };

  return (
    <DashboardContext.Provider value={{
      dashboards,
      categories,
      departments,
      addDashboard,
      updateDashboard,
      deleteDashboard,
      getFilteredDashboards
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboards = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboards must be used within a DashboardProvider');
  }
  return context;
};
