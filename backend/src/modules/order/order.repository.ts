import { Order, Prisma, Product } from "@prisma/client";
import Repository from "../base/repository";
import prisma from "../../prisma";
import { OrderInput } from "./order.service";

export class OrderRepository implements Repository {
  create(userId: number, entity: Omit<OrderInput, "products">): Promise<Order> {
    return prisma.order.create({
      data: {
        ...entity,
        userId,
        status: entity.status ?? "pending",
        total: entity.total ?? 0,
      },
    });
  }

  update(id: number, entity: Prisma.OrderUpdateInput): Promise<Order> {
    return prisma.order.update({
      where: {
        id,
      },
      data: { ...entity, updatedAt: new Date() },
    });
  }

  async delete(userId: number, id: number): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order || order.userId !== userId) {
      throw new Error("Order not found");
    }

    await prisma.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    return prisma.order.delete({
      where: {
        id,
      },
    });
  }

  findByUserWithId(userId: number, id: number): Promise<Order | null> {
    const product =
      prisma.order.findFirst({
        where: {
          userId,
          id,
        },
        include: {
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      }) ?? null;
    return product;
  }

  findById(id: number): Promise<Order | null> {
    const product =
      prisma.order.findFirst({
        where: {
          id,
        },
        include: {
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      }) ?? null;
    return product;
  }

  findAll(userId: number): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      include: {
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

export default new OrderRepository();
