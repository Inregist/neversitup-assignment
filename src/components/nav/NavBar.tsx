import { useAuth } from "@/modules/auth/AuthProvide";
import styles from "./NavBar.module.css";
import { useRouter } from "next/router";

export const NavBar = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <h3>Todo</h3>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
