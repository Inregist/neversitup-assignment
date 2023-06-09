import { Router } from "express";
import authService from "./auth.service";
import { JWTRequest, authenticateToken } from "../../middlewares/jwt";

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
    const maxAge = 1000 * 60 * 60;
    res.cookie("token", result, {
      maxAge: 5000,
      expires: new Date(Date.now() + maxAge),
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", authenticateToken, async (req: JWTRequest, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No token provided" });
    }
    const result = await authService.me(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default authRouter;
