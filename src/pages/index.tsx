import { NavBar } from "@/components/nav/NavBar";
import { useAuth } from "@/modules/auth/AuthProvide";
import { Todo } from "@/modules/todo/Todo";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const {
    getToken,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <Todo />
      </main>
    </>
  );
}
