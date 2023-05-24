import { createPortal } from "react-dom";
import styles from "./Todo.module.css";
import { useRef } from "react";
import { TodoForm } from "./TodoForm";

export const Todo = () => {
  const handleClickCreate = () => {};

  return (
    <div className={styles.wrapper}>
      <p>Todo</p>
      <TodoForm />
    </div>
  );
};
