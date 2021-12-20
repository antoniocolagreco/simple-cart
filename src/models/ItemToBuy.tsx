import ItemCategory from './ItemCategory';
import User from './User';

class ItemToBuy {
  id: string;
  name: string;
  amount: number;
  taken: boolean;
  pricePaidPerUnit: number;
  user: User;

  constructor(id: string, name: string, amount: number, taken: boolean, pricePaidPerUnit: number, user: User) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.taken = taken;
    this.pricePaidPerUnit = pricePaidPerUnit;
    this.user = user;
  }
}

export default ItemToBuy;
