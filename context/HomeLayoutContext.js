import React, { createContext, useContext } from 'react';
import { getHomeLayoutMetrics } from '../utils/homeLayout';

const HomeLayoutContext = createContext(null);

export const HomeLayoutProvider = ({ metrics, children }) => (
    <HomeLayoutContext.Provider value={metrics}>{children}</HomeLayoutContext.Provider>
);

export const useHomeLayout = () => {
    const context = useContext(HomeLayoutContext);
    if (!context) {
        throw new Error('useHomeLayout must be used within HomeLayoutProvider');
    }
    return context;
};

export { getHomeLayoutMetrics };
