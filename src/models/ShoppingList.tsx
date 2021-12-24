import ItemToBuy from './ItemToBuy';

class ShoppingList {
  id: string;
  name: string;
  currency: string;
  items: ItemToBuy[];
  users: string[];

  constructor(id: string, name: string, currency: string, items: ItemToBuy[], users: string[]) {
    this.id = id;
    this.name = name;
    this.currency = currency;
    this.items = items;
    this.users = users;
  }
}

export default ShoppingList;
