'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const   UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');

  useEffect(() => {

  }, []);


  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
