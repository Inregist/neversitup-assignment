import { Modal } from "@/components/modal/Modal";
import styles from "./Todo.module.css";
import { useEffect, useState } from "react";

type TodoFormProps = {
  active?: boolean;
};
export const TodoForm = (props: TodoFormProps) => {
  return (
    <Modal trigger={<button>Create Todo</button>} title="Create Todo">
      <div className={''}>
        <p>Todo Form</p>
      </div>
    </Modal>
  );
};
