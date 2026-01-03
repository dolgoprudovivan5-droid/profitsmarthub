"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ScreenContextType {
    isTablet: boolean;
    isPhone: boolean;
}

const ScreenContext = createContext<ScreenContextType>({
    isTablet: false,
    isPhone: false,
});

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isTablet, setIsTablet] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            setIsTablet(width < 1025 && width >= 450);
            setIsPhone(width < 450);
        };

        updateSize(); // Set initial values
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <ScreenContext.Provider value={{ isTablet, isPhone }}>
    {children}
    </ScreenContext.Provider>
);
};

export const useScreen = () => useContext(ScreenContext);
