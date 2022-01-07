import ShoppingList from './ShoppingList';

export default interface Profile {
  id: string;
  name: string;
  email: string;
  shoppingLists: ShoppingList[];
}

export interface Profile_DB {
  id: string;
  name: string;
  email: string;
  shoppingLists: string[];
}
