import { User } from 'firebase/auth';
import ItemToBuy from './ItemToBuy';

class ShoppingList {
  id: string | undefined;
  name: string;
  currency: string;
  items: ItemToBuy[];
  users: User[];

  constructor(id: string | undefined, name: string, currency: string, items: ItemToBuy[], users: User[]) {
    this.id = id;
    this.name = name;
    this.currency = currency;
    this.items = items;
    this.users = users;
  }

  static getDummyData = () => {
    return [
      new ShoppingList(undefined, 'Dummy Personal List', '€', [], []),
      new ShoppingList(undefined, 'Dummy Shared List', '€', [], []),
    ];
  };
}

export default ShoppingList;
