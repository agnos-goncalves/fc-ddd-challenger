import { Customer } from "../entity/customer";
import { v4 as uuidv4 } from "uuid";
import CustomerInterface from "../entity/customer.interface";
import { Address } from "../entity/address";

export default class CustomerFactory {
  public static create(name: string): CustomerInterface {
    return new Customer(uuidv4(), name);
  }

  public static createWithAddress(
    name: string,
    address: Address
  ): CustomerInterface {
    const customer = new Customer(uuidv4(), name);
    customer.changeAddress(address);
    return customer;
  }
}
