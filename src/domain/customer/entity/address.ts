export class Address {
  private _street: string;
  private _number: number;
  private _zipcode: string;
  private _city: string;

  constructor(street: string, number: number, zipcode: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;
    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    if (this._street === undefined) {
      throw new Error("Street is required");
    }
    if (this._number === undefined) {
      throw new Error("Number is required");
    }
    if (this._zipcode === undefined) {
      throw new Error("Zipcode is required");
    }
    if (this._city === undefined) {
      throw new Error("City is required");
    }
  }
}
