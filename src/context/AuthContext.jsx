import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(null);
     
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, []);

    function login(authData) {
        const receivedToken = authData.token;

        if (!receivedToken) {
            throw new Error("Login response did not contain a token.");
        }

        const userData = {
            username: authData.username,
            role: authData.role,
        };

        localStorage.setItem("token", receivedToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(null);
        setUser(null);
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider.");
    }

    return context;
}

