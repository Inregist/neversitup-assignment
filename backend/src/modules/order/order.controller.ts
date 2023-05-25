import { Router } from "express";
import productService from "./order.service";
import { number, z } from "zod";
import { JWTRequest } from "../../middlewares/jwt";

const orderRouter = Router();

orderRouter.get("/", async (req: JWTRequest, res, next) => {
  try {
    const userId = z.number().parse(req.user?.id);
    const result = await productService.getOrderList(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/:id", async (req: JWTRequest, res, next) => {
  try {
    const userId = z.number().parse(req.user?.id);
    const id = z.number().parse(req.params.id);
    const result = await productService.getOrder(userId, id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/", async (req: JWTRequest, res, next) => {
  try {
    const userId = z.number().parse(req.user?.id);
    const result = await productService.createOrder(userId, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.put("/update-status/:id", async (req: JWTRequest, res, next) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const id = z.number().parse(req.params.id);
    const result = await productService.updateOrderStatus(id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.delete("/:id", async (req: JWTRequest, res, next) => {
  try {
    const id = z.number().parse(req.params.id);
    const userId = z.number().parse(req.user?.id);
    const result = await productService.deleteOrder(userId, id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default orderRouter;
