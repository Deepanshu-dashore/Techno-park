import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqf_zQY3JJu6IMgUDyHwyD82MrxLShiGE",
    authDomain: "techno-park-website.firebaseapp.com",
    databaseURL: "https://techno-park-website-default-rtdb.firebaseio.com",
    projectId: "techno-park-website",
    storageBucket: "techno-park-website.firebasestorage.app",
    messagingSenderId: "397220797528",
    appId: "1:397220797528:web:e39f1eea81fa16d9067e2d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firebase Authentication
const adminAuth = getAuth();

// Create Context
export const FireContext = createContext();

// Firebase Provider Component
const FireBaseProvider = ({ children }) => {
    const [isAdmin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);

    // Create Admin User
    const createUser = async (email, password) => {
        try {
            const createAccount = await createUserWithEmailAndPassword(adminAuth, email, password);
            setUser(createAccount.user);
            setAdmin(true);
            return "user created suceccfully";
        } catch (error) {
            setUser(false);
            setAdmin(false);
            console.error("Error creating admin:", error.message); // Better error logging
            return "Error creating admin. Please try again.";
        }
    };

    // Login Method
    const LoginAdmin = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(adminAuth, email, password);
            if (response) {
                setAdmin(true);  // Set the admin state to true on successful login
                setUser(response.user);
                return "Successfully logged in as admin";
            }
        } catch (error) {
            setAdmin(false);  // Set the admin state to false on failure
            setUser(false);
            console.error("Login error:", error.message); // Better error logging
            return "Please check the details you entered.";
        }
    };

    // Logout Method
    const LogoutAdmin = () => {
        signOut(adminAuth)
            .then(() => {
                alert("User successfully logged out!");
                setAdmin(false);  // Set the admin state to false on logout
                setUser(false);
            })
            .catch((error) => {
                alert("Error logging out: " + error.message);
                console.error("Logout error:", error.message); // Better error logging
            });
    };

    // Track Auth State (useEffect ensures this runs on mount)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(adminAuth, (user) => {
            if (user) {
                setAdmin(true);  // User is logged in
                setUser(user);
                console.log("User logged in:");
            } else {
                setAdmin(false);  // User is logged out
                console.log("User not logged in");
            }
        });

        // Cleanup function to unsubscribe from auth state listener
        return () => unsubscribe();
    }, []);

   const isLoggin = user?true:false;

    return (
        <FireContext.Provider value={{ createUser, LoginAdmin, LogoutAdmin, isAdmin, isLoggin }}>
            {children}
        </FireContext.Provider>
    );
};

export default FireBaseProvider;