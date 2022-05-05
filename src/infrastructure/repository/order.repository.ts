import { idText } from "typescript";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          total: item.total(),
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async find(id: string): Promise<Order> {
    const model = await OrderModel.findOne({
      include: ["items"],
      where: {
        id,
      },
    });
    const orderItems = model.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );
    return new Order(model.id, model.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll();
    const orders = ordersModel.map((model: OrderModel) => {
      const items = model.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );
      return new Order(model.id, model.customer_id, items);
    });
    return orders;
  }

  async update(entity: Order): Promise<void> {
    const currentOrder = await this.find(entity.id);
    const newOrderItems = entity.items.filter((newItem) =>
      currentOrder.items.some((currentItem) => currentItem.id !== newItem.id)
    );

    newOrderItems.forEach(async (item) => {
      await OrderItemModel.create({
        id: item.id,
        product_id: item.productId,
        order_id: entity.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.total(),
      });
    });

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}
