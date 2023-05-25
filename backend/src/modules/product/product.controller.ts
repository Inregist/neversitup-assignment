import { Router } from "express";
import productService from "./product.service";
import { z } from "zod";
import { JWTRequest, authenticateToken } from "../../middlewares/jwt";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const result = await productService.getProductList();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const id = z.number().parse(+req.params.id);
    const result = await productService.getProduct(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

productRouter.post(
  "/",
  authenticateToken,
  async (req: JWTRequest, res, next) => {
    try {
      console.log(req.user);
      if (!req.user?.isAdmin) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      const result = await productService.createProduct(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.put(
  "/:id",
  authenticateToken,
  async (req: JWTRequest, res, next) => {
    try {
      if (!req.user?.isAdmin) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      const id = z.number().parse(+req.params.id);
      const result = await productService.updateProduct(id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = z.number().parse(+req.params.id);
    const result = await productService.deleteProduct(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default productRouter;
