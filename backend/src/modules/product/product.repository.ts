import { Product } from "@prisma/client";
import Repository from "../base/repository";
import prisma from "../../prisma";
import { ProductInput } from "./product.service";

export class ProductRepository implements Repository {
  create(entity: ProductInput): Promise<Product> {
    return prisma.product.create({
      data: entity,
    });
  }

  update(id: number, entity: ProductInput): Promise<Product> {
    return prisma.product.update({
      where: {
        id,
      },
      data: entity,
    });
  }

  delete(id: number): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    });
  }

  findByUserWithId(id: number): Promise<Product | null> {
    const product =
      prisma.product.findUnique({
        where: { id },
      }) ?? null;
    return product;
  }

  findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }
}

export default new ProductRepository();
