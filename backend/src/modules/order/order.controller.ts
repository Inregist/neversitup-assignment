import { Router } from "express";
import orderService from "./order.service";
import { z } from "zod";
import { JWTRequest } from "../../middlewares/jwt";

const orderRouter = Router();

orderRouter.get("/", async (req: JWTRequest, res, next) => {
  try {
    const userId = z.number().parse(req.user?.id);
    const result = await orderService.getOrderList(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/:id", async (req: JWTRequest, res, next) => {
  try {
    const userId = z.number().parse(req.user?.id);
    const id = z.number().parse(+req.params.id);
    const result = await orderService.getOrder(userId, id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/", async (req: JWTRequest, res, next) => {
  try {
    const userId = z.number().parse(req.user?.id);
    const result = await orderService.createOrder(userId, req.body);
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
    const id = z.number().parse(+req.params.id);
    const result = await orderService.updateOrderStatus(id, req.body.status);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

orderRouter.delete("/:id", async (req: JWTRequest, res, next) => {
  try {
    const id = z.number().parse(+req.params.id);
    const userId = z.number().parse(req.user?.id);
    const result = await orderService.deleteOrder(userId, id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default orderRouter;
