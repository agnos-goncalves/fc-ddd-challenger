import { Product } from "./product";

describe("Product unit test", () => {
  it("should throw error when id empty", () => {
    expect(() => {
      new Product("", "Bolsa", 100);
    }).toThrowError("id is required");
  });

  it("should throw error when name empty", () => {
    expect(() => {
      new Product("12", "", 100);
    }).toThrowError("name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("12", "bolsa", -1);
    }).toThrowError("price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("12", "bolsa", 200);
    product.changeName("mala");
    expect(product.name).toBe("mala");
  });

  it("should change price", () => {
    const product = new Product("12", "bolsa", 200);
    product.changePrice(50);
    expect(product.price).toBe(50);
  });
});
