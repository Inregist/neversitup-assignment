import { Modal } from "@/components/modal/Modal";
import styles from "./Todo.module.css";
import { useEffect, useState } from "react";
import { TodoInput, todoInputSchema, useTodo } from "./TodoProvide";

type TodoFormProps = {
  todo?: TodoInput;
  trigger?: React.ReactNode;
};

export const TodoForm = (props: TodoFormProps) => {
  const { createTodo, updateTodo } = useTodo();

  const [form, setForm] = useState<TodoInput>({
    title: "",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { todo, trigger } = props;

  const handleChangeTodo = (open: boolean) => {
    if (open && todo?._id) {
      setForm(todo);
    }

    setIsOpen(open);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const validateResult = todoInputSchema.safeParse(form);
    if (!validateResult.success) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (validate() === false) {
      alert("Invalid form, please check again");
      return;
    }
    try {
      if (todo?._id) {
        await updateTodo(todo._id, form);
      } else {
        await createTodo(form);
      }
      setIsOpen(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const mode = todo?._id ? "Edit" : "Create";

  return (
    <Modal
      trigger={trigger ?? <button>{mode} Todo</button>}
      title={`${mode} Todo`}
      onOpenChange={handleChangeTodo}
      open={isOpen}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          required
          autoFocus
          name="title"
          defaultValue={todo?.title}
          placeholder="Read books"
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          defaultValue={todo?.description}
          placeholder="Read 10 books in 2 hours"
          onChange={handleChange}
          rows={7}
        />

        <button>
          {isLoading ? "Loading..." : mode === "Edit" ? "Update" : "Create"}
        </button>
      </form>
    </Modal>
  );
};
