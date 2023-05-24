import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { axios, setToken } from "@/utils/axios";
import { z } from "zod";

export const todoInputSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
});

const todoSchema = todoInputSchema.extend({
  _id: z.string(),
});

export type TodoInput = z.infer<typeof todoInputSchema>;
export type Todo = z.infer<typeof todoSchema>;

const InternalHook = () => {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    if (!axios.defaults.headers.common["Authorization"]) {
      const token = sessionStorage.getItem("token");
      if (token) {
        setToken(token);
      }
    }

    getAllTodo();
  }, []);

  const getAllTodo = async () => {
    const res = await axios.get(`/todos`);
    const data = res.data as Todo[];
    setTodos(data);
    return data;
  };

  const getTodo = async (id: string) => {
    return axios.get(`/todos/${id}`);
  };

  const createTodo = async (data: TodoInput) => {
    await axios.post(`/todos`, data);
    getAllTodo();
  };

  const updateTodo = async (id: string, data: TodoInput) => {
    await axios.put(`/todos/${id}`, data);
    getAllTodo();
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`/todos/${id}`);
    getAllTodo();
  };

  return {
    todos,
    getAllTodo,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

const TodoContext = createContext<ReturnType<typeof InternalHook> | undefined>(
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
  const data = InternalHook();
  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};
