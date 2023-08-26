import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
import axios from "axios";

const GithubProvider = new GithubAuthProvider();
const GoogleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUsersCount, setLoggedInUsersCount] = useState(0);

  const googleSignIn = () => {
    return signInWithPopup(auth, GoogleProvider);
  };
  const githubSignIn = () => {
    return signInWithPopup(auth, GithubProvider);
  };

  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const logOut = () => {
    setLoading(false);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      if (loggedUser) {
        setLoggedInUsersCount((prevCount) => (prevCount || 0) + 1); // Increment count
      } else {
        setLoggedInUsersCount(0);
      }

      // get and set token
      if (loggedUser) {
        const user = { email: loggedUser.email };
        axios.post("http://localhost:5000/jwt", user).then((res) => {
          console.log("json", res);

          // set local storage
          localStorage.setItem("contact-access-token", res.data.token);
          setLoading(false);
        });
      } else {
        localStorage.removeItem("contact-access-token");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signIn,
    logOut,
    loading,
    googleSignIn,
    githubSignIn,
    updateUserProfile,
    loggedInUsersCount,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
