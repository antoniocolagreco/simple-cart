import ItemToBuy from './ItemToBuy';
import User from './User';

class ShoppingList {
  id: string;
  name: string;
  currency: string;
  items: ItemToBuy[];
  users: User[];

  constructor(id: string, name: string, currency: string, items: ItemToBuy[], users: User[]) {
    this.id = id;
    this.name = name;
    this.currency = currency;
    this.items = items;
    this.users = users;
  }
}

export default ShoppingList;
