import { Router } from "express";
import authRouter from "./auth/auth.controller";
import productRouter from "./product/product.controller";
import orderRouter from "./order/order.controller";
import { authenticateToken } from "../middlewares/jwt";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/orders", authenticateToken, orderRouter);

export default router;
