import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit test", () => {
  it("should throw error when id empty", () => {
    expect(() => {
      new Customer("", "gnolo");
    }).toThrowError("Id is required");
  });

  it("should throw error when name empty", () => {
    expect(() => {
      new Customer("124343", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("124343", "gnolo");
    customer.changeName("abdul");
    expect(customer.name).toBe("abdul");
  });

  it("should throw error when address is undefined when activated customer", () => {
    const customer = new Customer("124343", "gnolo");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is required");
  });

  it("should activate customer", () => {
    const customer = new Customer("124343", "gnolo");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should inactivate customer", () => {
    const customer = new Customer("124343", "gnolo");
    customer.inactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should add rewards points", () => {
    const customer = new Customer("124343", "gnolo");

    expect(customer.rewardPoints).toBe(0);
    customer.addRewards(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewards(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
