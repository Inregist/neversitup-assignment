import { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../auth/AuthProvide";
import { useRouter } from "next/router";

export const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      await login(form.username, form.password);
      // router.push("/");
    }catch(err){
      console.log(err);
    }
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
