import { PropsWithChildren, createContext, useContext } from "react";
import { axios, setToken } from "@/utils/axios";

type TodoInput = {
  title: string;
  description?: string;
};

const internalHook = () => {
  const getAllTodo = async () => {
    return axios.get(`/todos`);
  };

  const getTodo = async (id: string) => {
    return axios.get(`/todos/${id}`);
  };

  const createTodo = async (data: TodoInput) => {
    return axios.post(`/todos`);
  };

  const updateTodo = async (id: string, data: TodoInput) => {
    return axios.put(`/todos/${id}`);
  };

  const deleteTodo = async (id: string) => {
    return axios.delete(`/todos/${id}`);
  };

  return {
    getAllTodo,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

const TodoContext = createContext<ReturnType<typeof internalHook> | undefined>(
  undefined
);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const data = internalHook();
  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};
