import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Create a custom hook to use the UserContext
export const useUserContext = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};

