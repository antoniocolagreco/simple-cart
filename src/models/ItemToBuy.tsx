class ItemToBuy {
  id: string;
  name: string;
  amount: number;
  taken: boolean;
  pricePaidPerUnit: number;
  user: string;

  constructor(id: string, name: string, amount: number, taken: boolean, pricePaidPerUnit: number, user: string) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.taken = taken;
    this.pricePaidPerUnit = pricePaidPerUnit;
    this.user = user;
  }
}

export default ItemToBuy;
