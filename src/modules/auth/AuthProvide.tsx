import { PropsWithChildren, createContext, useContext } from "react";
import { axios, setToken } from "@/utils/axios";

const internalHook = () => {
  const login = async (username: string, password: string) => {
    const endpoint =
      process.env.NEXT_PUBLIC_API_ENDPOINT ??
      "https://candidate.neversitup.com/todo";

    try {
      const res = await axios.post(`${endpoint}/users/auth`, {
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

const AuthContext = createContext<ReturnType<typeof internalHook> | undefined>(
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
  const data = internalHook();
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
