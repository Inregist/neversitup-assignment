import { AuthProvider } from "@/modules/auth/AuthProvide";
import { TodoProvider } from "@/modules/todo/TodoProvide";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TodoProvider>
        <Component {...pageProps} />
        <div id="modal-root"></div>
      </TodoProvider>
    </AuthProvider>
  );
}
