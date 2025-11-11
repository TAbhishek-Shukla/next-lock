// context/SessionContext.js
'use client';
import { createContext, useContext, useState } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ initialSession, children }) => {
  const [session, setSession] = useState(initialSession || null);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
