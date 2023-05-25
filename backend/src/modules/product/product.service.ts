import { Product } from "@prisma/client";
import productRepository, { ProductRepository } from "./product.repository";
import { z } from "zod";

export const productInputSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});
export type ProductInput = z.infer<typeof productInputSchema>;

class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: Product): Promise<Product> {
    const validated = productInputSchema.parse(product);
    return this.productRepository.create(validated);
  }

  async updateProduct(
    id: number,
    product: Omit<Product, "id">
  ): Promise<Product> {
    const validated = productInputSchema
      .omit({
        id: true,
      })
      .parse(product);

    this.getProduct(id);
    return this.productRepository.update(id, validated);
  }

  async deleteProduct(id: number): Promise<Product> {
    this.getProduct(id);
    return this.productRepository.delete(id);
  }

  async getProduct(id: number): Promise<Product | null> {
    const existingProduct = await this.productRepository.findByUserWithId(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    return this.productRepository.findByUserWithId(id);
  }

  async getProductList(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}

export default new ProductService(productRepository);
