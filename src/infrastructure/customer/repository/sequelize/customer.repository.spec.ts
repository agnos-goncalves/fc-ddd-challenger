import { Sequelize } from "sequelize-typescript";
import { Address } from "../../../../domain/customer/entity/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "my user");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: false,
      rewardPoints: 0,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
    });
  });

  it("should update customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "my user");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName("my user update");

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: "my user update",
      active: false,
      rewardPoints: 0,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
    });
  });

  it("should find customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "my user");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);

    await customerRepository.create(customer);
    const customerFounded = await customerRepository.find(customer.id);

    const customerModel = await CustomerModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customerFounded.id,
      name: customerFounded.name,
      active: customerFounded.isActive(),
      rewardPoints: customerFounded.rewardPoints,
      street: customerFounded.address.street,
      number: customerFounded.address.number,
      zipcode: customerFounded.address.zipcode,
      city: customerFounded.address.city,
    });
  });

  it("should find all products", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("street", 20, "08100000", "sp");

    const customer = new Customer("1", "my user");
    customer.changeAddress(address);

    const customer2 = new Customer("2", "my user 2");
    customer2.changeAddress(address);

    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customers = [customer, customer2];
    const customerFound = await customerRepository.findAll();

    expect(customers).toEqual(customerFound);
  });
});
