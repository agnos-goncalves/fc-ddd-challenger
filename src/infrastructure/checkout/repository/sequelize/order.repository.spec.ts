import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order-item";
import { Address } from "../../../../domain/customer/entity/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Product } from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

import { OrderRepository } from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      ProductModel,
      OrderModel,
      OrderItemModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "my user");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("123", customer.id, [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          product_id: orderItem.productId,
          order_id: order.id,
          quantity: orderItem.quantity,
          name: orderItem.name,
          price: orderItem.price,
          total: orderItem.total(),
        },
      ],
    });
  });

  it("should update items on order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "my user");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 100);
    const product2 = new Product("2", "product 2", 200);

    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      3
    );

    const orderRepository = new OrderRepository();
    const order = new Order("123", customer.id, [orderItem]);

    await orderRepository.create(order);

    order.addItems([orderItem2]);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: order.items[0].id,
          product_id: order.items[0].productId,
          order_id: order.id,
          quantity: order.items[0].quantity,
          name: order.items[0].name,
          price: order.items[0].price,
          total: order.items[0].total(),
        },
        {
          id: order.items[1].id,
          product_id: order.items[1].productId,
          order_id: order.id,
          quantity: order.items[1].quantity,
          name: order.items[1].name,
          price: order.items[1].price,
          total: order.items[1].total(),
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "my user");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("50", "product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "3",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("1234", customer.id, [orderItem]);
    const order2 = new Order("123456", customer.id, [orderItem2]);
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const ordersFound = await orderRepository.findAll();

    expect(ordersFound).toStrictEqual([order, order2]);
  });

  it("should find order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "my user");
    const address = new Address("street", 20, "08100000", "sp");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("50", "product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderRepository = new OrderRepository();
    const order = new Order("1234", customer.id, [orderItem]);
    await orderRepository.create(order);
    const orderFound = await orderRepository.find(order.id);
    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: orderFound.customerId,
      total: orderFound.total(),
      items: [
        {
          id: orderFound.items[0].id,
          product_id: orderFound.items[0].productId,
          order_id: orderFound.id,
          quantity: orderFound.items[0].quantity,
          name: orderFound.items[0].name,
          price: orderFound.items[0].price,
          total: orderFound.items[0].total(),
        },
      ],
    });
  });
});
