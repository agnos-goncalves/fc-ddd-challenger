import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("ProductService unit test", () => {
  it("should change the prices all products", () => {
    const product1 = new Product("p1", "Bolsa", 50);
    const product2 = new Product("p1", "Mala", 100);

    ProductService.increasePrice([product1, product2], 100);

    expect(product1.price).toEqual(100);
    expect(product2.price).toEqual(200);
  });
});
