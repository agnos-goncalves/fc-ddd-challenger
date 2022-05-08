import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "product 1",
      price: 100,
    });
  });

  it("should udpdate product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 100);

    await productRepository.create(product);

    product.changeName("product new name");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "product new name",
      price: 200,
    });
  });

  it("should find product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });
    const productFound = await productRepository.find("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 100);
    const product2 = new Product("2", "product 2", 100);

    await productRepository.create(product);
    await productRepository.create(product2);

    const products = [product, product2];
    const productsFound = await productRepository.findAll();

    expect(products).toEqual(productsFound);
  });
});
