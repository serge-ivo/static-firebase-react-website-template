import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabContextProps {
    activeTabMenuPage: number;
    setActiveTabMenuPage: (newValue: number) => void;
}

export const TabIndices = {
	HOME: 0,
	USER: 1,
	PROJECT: 2,
	ADMIN: 3,
};

export const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [activeTabMenuPage, setActiveTabMenuPage] = useState(TabIndices.HOME);

	const value = {
		activeTabMenuPage,
		setActiveTabMenuPage,
	};

	return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};
