import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './config';

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);

// Google Sign-In
export const loginWithGoogle = () => {
 const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
  return signInWithPopup(auth, provider);
};
