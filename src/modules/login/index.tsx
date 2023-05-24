import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../auth/AuthProvide";
import { useRouter } from "next/router";

export const LoginPage = () => {
  const { login, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      router.push("/");
    }
  }, []);

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
    const res = await login(form.username, form.password);
    if(res?.data?.token){
      router.push("/");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
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
        <button className={styles.submit}>Login</button>
      </form>
    </div>
  );
};
