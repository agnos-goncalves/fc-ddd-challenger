import { v4 as uuidv4 } from "uuid";
import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";
import ProductInterface from "../entity/product.interface";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuidv4(), name, price);
        break;
      case "b":
        return new ProductB(uuidv4(), name, price);
        break;
      default:
        throw new Error("Product type is not support");
        break;
    }
  }
}
