import { Router } from "express";
import authService from "./auth.service";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
  res.send("register");
});

authRouter.post("/login", (req, res) => {
  res.send("login");
});

authRouter.post("/logout", (req, res) => {
  res.send("logout");
});

authRouter.get("/me", async (req, res) => {
  const result = await authService.me();
  res.json(result);
});

export default authRouter;
