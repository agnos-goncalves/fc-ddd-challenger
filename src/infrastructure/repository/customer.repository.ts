import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    const { id, name, rewardPoints } = entity;
    const { street, number, zipcode, city } = entity.address;
    await CustomerModel.create({
      id,
      name,
      active: entity.isActive(),
      rewardPoints,
      street,
      number,
      zipcode,
      city,
    });
  }
  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({
      where: {
        id,
      },
    });

    const { name, rewardPoints, street, number, zipcode, city } = customerModel;
    const customer = new Customer(id, name);
    const address = new Address(street, number, zipcode, city);
    customer.changeAddress(address);
    customer.addRewards(rewardPoints);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModel = await CustomerModel.findAll();

    const customers = customerModel.map((model: CustomerModel) => {
      const { id, name, rewardPoints, street, number, zipcode, city } = model;

      const customer = new Customer(id, name);
      const address = new Address(street, number, zipcode, city);
      customer.changeAddress(address);

      customer.addRewards(rewardPoints);
      return customer;
    });

    return customers;
  }

  async update(entity: Customer): Promise<void> {
    const { id, name, rewardPoints } = entity;
    const { street, number, zipcode, city } = entity.address;

    await CustomerModel.update(
      { id, name, rewardPoints, street, number, zipcode, city },
      {
        where: {
          id,
        },
      }
    );
  }
}
