import { createPortal } from "react-dom";
import styles from "./Todo.module.css";
import { useRef } from "react";
import { TodoForm } from "./TodoForm";
import { useTodo } from "./TodoProvide";
import { todo } from "node:test";

export const Todo = () => {
  const { todos, deleteTodo } = useTodo();

  return (
    <div className={styles.wrapper}>
      <div className={styles.todoContainer}>
        {todos?.map((todo) => {
          return (
            <div className={styles.todoItem} key={todo._id}>
              <div className={styles.header}>
                <h3>{todo.title}</h3>
              </div>
              <div className={styles.content}>
                <p>{todo.description}</p>
              </div>
              <div className={styles.action}>
                <TodoForm todo={todo} />
                <button className={styles.delete} onClick={() => deleteTodo(todo._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
