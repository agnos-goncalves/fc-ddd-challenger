import { Product } from "../../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    const { id, name, price } = entity;
    await ProductModel.create({ id, name, price });
  }
  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({
      where: {
        id,
      },
    });

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productModel = await ProductModel.findAll();
    const products = productModel.map(
      (model: ProductModel) => new Product(model.id, model.name, model.price)
    );
    return products;
  }

  async update(entity: Product): Promise<void> {
    const { id, name, price } = entity;

    await ProductModel.update(
      { name, price },
      {
        where: {
          id,
        },
      }
    );
  }
}
