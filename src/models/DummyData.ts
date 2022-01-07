import ItemToBuy from './ItemToBuy';
import ItemType from './ItemType';
import { getMeasureUnitById } from './MeasureUnit';
import Profile from './Profile';
import ShoppingList from './ShoppingList';

export default class DummyData {
  profile: Profile;
  itemTypes: ItemType[];
  itemsToBuy: ItemToBuy[];
  shoppingLists: ShoppingList[];

  constructor(profile: Profile) {
    this.profile = profile;
    this.itemTypes = [
      { id: 'item_type_1', measureUnit: getMeasureUnitById('mu_gr'), name: 'Prosciutto' },
      { id: 'item_type_2', measureUnit: getMeasureUnitById('mu_l'), name: 'Latte' },
      { id: 'item_type_3', measureUnit: getMeasureUnitById('mu_pz'), name: 'Acqua' },
      { id: 'item_type_4', measureUnit: getMeasureUnitById('mu_pz'), name: 'Dentifricio' },
      { id: 'item_type_5', measureUnit: getMeasureUnitById('mu_pz'), name: 'Forchette' },
    ];
    this.itemsToBuy = [
      {
        id: 'item_to_buy_1',
        amount: 200,
        itemType: this.itemTypes.find((it) => it.id === 'item_type_1')!,
        profile: this.profile,
      },
      {
        id: 'item_to_buy_2',
        amount: 2,
        itemType: this.itemTypes.find((it) => it.id === 'item_type_2')!,
        profile: this.profile,
      },
      {
        id: 'item_to_buy_3',
        amount: 12,
        itemType: this.itemTypes.find((it) => it.id === 'item_type_3')!,
        profile: this.profile,
      },
      {
        id: 'item_to_buy_4',
        amount: 1,
        itemType: this.itemTypes.find((it) => it.id === 'item_type_4')!,
        profile: this.profile,
      },
      {
        id: 'item_to_buy_5',
        amount: 6,
        itemType: this.itemTypes.find((it) => it.id === 'item_type_5')!,
        profile: this.profile,
      },
    ];
    this.shoppingLists = [
      { id: 'shopping_list_1', name: 'Alimentari', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_2', name: 'Ferramenta', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_3', name: 'Spesa condivisa', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_4', name: 'Compleanno di Marco', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_5', name: 'Spesa per la mamma', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_6', name: 'Regali di Natale', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_7', name: 'Alimentari', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_8', name: 'Ferramenta', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_9', name: 'Spesa condivisa', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_10', name: 'Compleanno di Marco', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_11', name: 'Spesa per la mamma', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
      { id: 'shopping_list_12', name: 'Regali di Natale', itemsToBuy: this.itemsToBuy, profiles: [this.profile] },
    ];
  }
}
