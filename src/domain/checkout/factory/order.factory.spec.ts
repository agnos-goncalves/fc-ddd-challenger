import { v4 as uuidv4 } from "uuid";
import OrderFactory, { OrderFactoryProps } from "./order.factory";

describe("OrderFactory unit test", () => {
  it("should create new order", () => {
    const orderProps: OrderFactoryProps = {
      id: uuidv4(),
      customerId: uuidv4(),
      items: [
        {
          id: uuidv4(),
          name: "item 1",
          productId: uuidv4(),
          quantity: 1,
          price: 200,
        },
      ],
    };
    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toBeDefined();
    expect(order.items.length).toBe(1);
  });
});
