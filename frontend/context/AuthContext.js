import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        setUser({ ...firebaseUser, token });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
