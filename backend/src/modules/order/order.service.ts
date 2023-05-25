import { Order, OrderItem } from "@prisma/client";
import orderRepository, { OrderRepository } from "./order.repository";
import { z } from "zod";
import orderItemRepository, {
  OrderItemRepository,
} from "../orderItem/orderItem.repository";
import { orderItemInputSchema } from "../orderItem/orderItem.service";

export const orderInputSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  products: z.array(orderItemInputSchema),
  status: z.string().default("pending"),
  total: z.number().optional(),
});
export type OrderInput = z.infer<typeof orderInputSchema>;

const orderStatusSchema = z.enum([
  "pending",
  "paid",
  "delivering",
  "completed",
]);

class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository
  ) {}

  async createOrder(
    userId: number,
    order: OrderInput
  ): Promise<
    Order & {
      items: OrderItem[];
    }
  > {
    const validated = orderInputSchema.parse(order);
    const { products, ...validatedOrder } = validated;

    const createdOrder = await this.orderRepository.create({
      ...validatedOrder,
      userId,
      total: products.reduce(
        (acc, cur) => acc + cur.unitPrice * cur.quantity,
        0
      ),
    });

    const createdOrderItems = await this.orderItemRepository.createMany(
      products
    );

    return {
      ...createdOrder,
      items: createdOrderItems,
    };
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const existingProduct = await this.orderRepository.findById(id);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    orderStatusSchema.parse(status);
    return this.orderRepository.update(id, { status });
  }

  async deleteOrder(userId: number, id: number): Promise<Order> {
    this.getOrder(userId, id);
    return this.orderRepository.delete(userId, id);
  }

  async getOrder(userId: number, id: number): Promise<Order | null> {
    const existingProduct = await this.orderRepository.findByUserWithId(
      userId,
      id
    );
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    return this.orderRepository.findByUserWithId(userId, id);
  }

  async getOrderList(userId: number): Promise<Order[]> {
    return this.orderRepository.findAll(userId);
  }
}

export default new OrderService(orderRepository, orderItemRepository);
