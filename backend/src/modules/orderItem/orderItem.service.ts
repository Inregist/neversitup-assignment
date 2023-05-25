import { OrderItem } from "@prisma/client";
import orderItemRepository, {
  OrderItemRepository,
} from "./orderItem.repository";
import { z } from "zod";

export const orderItemInputSchema = z.object({
  id: z.number().optional(),
  orderId: z.number().optional(),
  productId: z.number(),
  quantity: z.number(),
  unitPrice: z.number(),
});
export type OrderItemInput = z.infer<typeof orderItemInputSchema>;

class OrderItemService {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async createOrderItem(product: OrderItemInput): Promise<OrderItem> {
    const validated = orderItemInputSchema.parse(product);
    return this.orderItemRepository.create(validated);
  }

  async createManyOrderItem(product: OrderItemInput[]): Promise<OrderItem> {
    const validated = orderItemInputSchema.parse(product);
    return this.orderItemRepository.create(validated);
  }

  async updateOrderItem(
    id: number,
    orderItem: Omit<OrderItem, "id">
  ): Promise<OrderItem> {
    const validated = orderItemInputSchema
      .omit({
        id: true,
      })
      .parse(orderItem);

    this.getOrderItem(id);
    return this.orderItemRepository.update(id, validated);
  }

  async deleteOrderItem(id: number): Promise<OrderItem> {
    this.getOrderItem(id);
    return this.orderItemRepository.delete(id);
  }

  async getOrderItem(id: number): Promise<OrderItem | null> {
    const existingOrderItem = await this.orderItemRepository.findByUserWithId(id);
    if (!existingOrderItem) {
      throw new Error("OrderItem not found");
    }

    return this.orderItemRepository.findByUserWithId(id);
  }

  async getOrderItemList(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }
}

export default new OrderItemService(orderItemRepository);
