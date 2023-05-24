import { Router } from "express";
import authRouter from "./auth/auth.controller";
import productRouter from "./products/product.controller";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);

export default router;
