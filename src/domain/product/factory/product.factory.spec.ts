import ProductFactory from "./product,factory";

describe("ProductFactory unit test", () => {
  it("should create product type A", () => {
    const product = ProductFactory.create("a", "product A", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create product type B", () => {
    const product = ProductFactory.create("b", "product B", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product B");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw new error when product type is not support", () => {
    expect(() => {
      ProductFactory.create("c", "product B", 1);
    }).toThrowError("Product type is not support");
  });
});
