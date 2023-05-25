import { OrderItem, Prisma } from "@prisma/client";
import Repository from "../base/repository";
import prisma from "../../prisma";
import { OrderItemInput } from "./orderItem.service";

export class OrderItemRepository implements Repository {
  create(entity: OrderItemInput): Promise<OrderItem> {
    return prisma.orderItem.create({
      data: {
        order: { connect: { id: entity.orderId } },
        product: { connect: { id: entity.productId } },
        quantity: entity.quantity,
        unitPrice: entity.unitPrice,
      },
    });
  }

  async createMany(
    orderId: number,
    entities: OrderItemInput[]
  ): Promise<OrderItem[]> {
    await prisma.orderItem.createMany({
      data: entities.map((entity) => ({
        ...entity,
        orderId,
      })),
    });

    return prisma.orderItem.findMany({
      where: {
        orderId: entities[0].orderId,
      },
    });
  }

  update(id: number, entity: OrderItemInput): Promise<OrderItem> {
    return prisma.orderItem.update({
      where: {
        id,
      },
      data: { ...entity, updatedAt: new Date() },
    });
  }

  delete(id: number): Promise<OrderItem> {
    return prisma.orderItem.delete({
      where: { id },
    });
  }

  findByUserWithId(id: number): Promise<OrderItem | null> {
    const product =
      prisma.orderItem.findUnique({
        where: { id },
      }) ?? null;
    return product;
  }

  findAll(): Promise<OrderItem[]> {
    return prisma.orderItem.findMany();
  }
}

export default new OrderItemRepository();
