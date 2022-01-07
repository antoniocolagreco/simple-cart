import ItemType from './ItemType';
import Profile from './Profile';

export default interface ItemToBuy {
  id: string;
  amount: number;
  taken?: boolean;
  pricePaidPerUnit?: number;
  itemType: ItemType;
  profile: Profile;
}

export interface ItemToBuy_DB {
  id: string;
  amount: number;
  taken?: boolean;
  pricePaidPerUnit?: number;
  itemType: string;
  profile: string;
}
