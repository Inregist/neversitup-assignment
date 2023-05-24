import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { axios, setToken } from "@/utils/axios";

const InternalHook = () => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(`/users/auth`, {
        username,
        password,
      });

      sessionStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken("");
  };

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  return {
    login,
    getToken,
    logout,
  };
};

const AuthContext = createContext<ReturnType<typeof InternalHook> | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const data = InternalHook();
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
