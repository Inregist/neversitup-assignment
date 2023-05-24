import { Router } from "express";
import authService from "./auth.service";
import { JWTRequest } from "../../middlewares/jwt";

const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", async (req, res, next) => {
  try {
    const result = await authService.me(1);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default authRouter;
