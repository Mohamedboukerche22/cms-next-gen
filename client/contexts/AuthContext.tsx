import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "admin" | "contestant";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedUser = localStorage.getItem("ioi_cms_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("ioi_cms_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For MVP, we'll use hardcoded credentials
      // In production, this would make an API call
      const mockUsers: Record<
        string,
        { password: string; role: UserRole; email?: string }
      > = {
        admin: { password: "admin123", role: "admin", email: "admin@ioi.org" },
        contestant1: {
          password: "contest123",
          role: "contestant",
          email: "contestant1@example.com",
        },
        contestant2: {
          password: "contest123",
          role: "contestant",
          email: "contestant2@example.com",
        },
      };

      const userData = mockUsers[username];
      if (userData && userData.password === password) {
        const user: User = {
          id: username,
          username,
          role: userData.role,
          email: userData.email,
        };
        setUser(user);
        localStorage.setItem("ioi_cms_user", JSON.stringify(user));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ioi_cms_user");
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
