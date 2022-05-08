import { Customer } from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderService } from "./order.service";

describe("OrderService unit test", () => {
  it("should place order", () => {
    const customer = new Customer("1", "Batatinha");
    const item = new OrderItem("1", "copo", 10, "2", 1);
    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total all of orders", () => {
    const item = new OrderItem("1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("1", "item 1", 200, "p1", 1);
    const order = new Order("1", "client 1", [item]);
    const order2 = new Order("2", "client 1", [item2]);
    const total = OrderService.total([order, order2]);

    expect(total).toEqual(400);
  });
});
