import { v4 as uuidv4 } from "uuid";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";

export interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );

    return new Order(props.id, props.customerId, items);
  }
}
