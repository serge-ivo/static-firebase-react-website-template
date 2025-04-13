import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};


// import { collection, getDocs, query } from 'firebase/firestore';
// import { db } from '../services/firebaseConfig';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { User } from '../types';
// import { useAuthContext } from '../hooks/useAuthContext';

// // Define the shape of the context value
// interface UserContextType {
//     users: User[] | null;
//     loading: boolean;
// }

// // Create the context
// export const UserContext = createContext<UserContextType | undefined>(
// 	undefined
// );

// // Create the provider component
// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	const [users, setUsers] = useState<User[] | null>(null);
// 	const [loading, setLoading] = useState(true);

// 	const { currentUser } = useAuthContext();
// 	const fetchUsers = async () => {
// 		try {
// 			const queryGetUsers = query(collection(db, 'users'));
// 			const usersSnapshot = await getDocs(queryGetUsers);
// 			const userData: User[] = usersSnapshot.docs.map(
// 				(doc) =>
//                     ({
//                     	id: doc.id,
//                     	...doc.data(),
//                     }) as User
// 			);

// 			// console.log(userData);

// 			setUsers([...userData]);
// 		} catch (error) {
// 			console.error('Error fetching users:', error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		if (currentUser) {
// 			fetchUsers();
// 		} else {
// 			setLoading(false);
// 		}
// 	}, [currentUser]);

// 	const value = { users, loading };

// 	return (
// 		<UserContext.Provider value={value}>
// 			{!loading && children}
// 		</UserContext.Provider>
// 	);
// };
