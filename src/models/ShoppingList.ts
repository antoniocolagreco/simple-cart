import ItemToBuy from './ItemToBuy';
import Profile from './Profile';

export default interface ShoppingList {
  id?: string;
  name: string;
  itemsToBuy: ItemToBuy[];
  profiles: Profile[];
}

export interface ShoppingList_DB {
  id?: string;
  name: string;
  itemsToBuy: string[];
  profiles: string[];
}
