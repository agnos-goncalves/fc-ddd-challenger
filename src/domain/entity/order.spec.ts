import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit test", () => {
  it("should throw error when id empty", () => {
    expect(() => {
      new Order("", "20", []);
    }).toThrowError("id is required");
  });

  it("should throw error when customerId empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrowError("customerId is required");
  });

  it("should throw error when items empty", () => {
    expect(() => {
      new Order("1", "20", []);
    }).toThrowError("item qtd must be greater than zero");
  });

  it("should calculate total", () => {
    const order = new Order("1", "20", [
      new OrderItem("1", "bolsa", 20, "p1", 2),
    ]);

    expect(order.total()).toBe(40);

    const order2 = new Order("1", "20", [
      new OrderItem("1", "bolsa", 20, "p1", 2),
      new OrderItem("2", "mala", 10, "p2", 2),
    ]);

    expect(order2.total()).toBe(60);
  });

  it("should add items", () => {
    const items = [
      new OrderItem("1", "bolsa", 20, "p1", 2),
      new OrderItem("2", "mala", 10, "p2", 2),
    ];
    const order = new Order("1", "20", [items[0]]);

    order.addItems([items[1]]);

    expect(order.items).toEqual(items);
    expect(order.total()).toBe(60);
  });

  it("should throw error when qte is less or equal zero", () => {
    expect(() => {
      new Order("1", "20", [new OrderItem("1", "bolsa", 20, "p1", 0)]);
    }).toThrowError("quantity must be greater than 0");
  });
});
