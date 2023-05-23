import { useState } from "react";
import styles from "./login.module.css";

export const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          name="username"
          className={styles.input}
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          name="password"
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};
