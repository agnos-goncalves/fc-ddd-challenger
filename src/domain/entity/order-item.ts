export class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;
  private _total: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantitiy: number
  ) {
    this._id = id;
    this._name = name;
    this._productId = productId;
    this._quantity = quantitiy;
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("id is required");
    }
    if (this._name.length === 0) {
      throw new Error("name is required");
    }
    if (this._price === 0) {
      throw new Error("price must be greater than zero");
    }
    if (this._quantity <= 0) {
      throw new Error("quantity must be greater than 0");
    }
    return true;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  total(): number {
    return this._price * this._quantity;
  }
}
