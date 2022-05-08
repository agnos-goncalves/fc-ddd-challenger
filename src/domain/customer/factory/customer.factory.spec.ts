import { Address } from "../entity/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory unit test", () => {
  it("should create new customer", () => {
    const customer = CustomerFactory.create("Jonh");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jonh");
    expect(customer.address).toBeUndefined();
  });

  it("should create new customer with address", () => {
    const address = new Address("street", 20, "08100000", "sp");
    const customer = CustomerFactory.createWithAddress("Jonh", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jonh");
    expect(customer.address).toBe(address);
  });
});
