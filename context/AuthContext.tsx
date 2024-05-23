'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { SalesPersonInterface } from "../interfaces/SalesPerson.interface";
import { requestHandler } from "../utils/requestHandler.utils";
import { loginUser } from "@/apihandler/auth.api";
import { LocalStorage } from "@/utils/LocalStorage.utils";
import Loading from "@/components/ui/loading";

const apiCall = () => Promise.resolve({ data: "Hello World!" });
// Create a context to manage authentication-related data and functions
const AuthContext = createContext<{
  user: SalesPersonInterface | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<SalesPersonInterface | null>(null);

  const router = useRouter()

  // Function to handle user login
  const login = async (data: { username: string; password: string }) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      (res: any) => {
        const { result} = res;
        const data = result[0];
        console.log("login data", data, res);
        if (data) {
          const user = {name: data.NAME_E, staffCode: data.STAFF_CODE};
          setUser(user);
          LocalStorage.set("user", user);
          router.replace("/product") // Redirect to the chat page after successful login
        } else {
          alert("wrong credential")
        }
      },
      alert,
    );
  };

  // Function to handle user logout
  const logout = async () => {
    setUser(null);
    LocalStorage.clear(); // Clear local storage on logout
    router.replace("/login")// Redirect to the login page after successful logout
  };

  // Check for saved user and token in local storage during component initialization
  useEffect(() => {
    setIsLoading(true);
    const _user = LocalStorage.get("user");
    console.log("user", _user)
    if (_user) {
      setUser(_user);
    }
    setIsLoading(false);
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {isLoading ? <Loading /> : children} {/* Display a loader while loading */}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
