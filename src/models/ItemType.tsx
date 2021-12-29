import ItemCategory from './ItemCategory';

class ItemType {
  id: string | undefined;
  name: string;
  measureUnit: string;
  measureUnitStep: number;
  categories: ItemCategory[];

  constructor(
    id: string | undefined,
    name: string,
    measureUnit: string,
    measureUnitStep: number,
    categories: ItemCategory[]
  ) {
    this.id = id;
    this.name = name;
    this.measureUnit = measureUnit;
    this.measureUnitStep = measureUnitStep;
    this.categories = categories;
  }

  static getDummyData = () => {
    return [
      new ItemType(undefined, 'Broccoli', 'Gr', 100, []),
      new ItemType(undefined, 'Spaghetti', 'Gr', 500, []),
      new ItemType(undefined, 'Latte', 'Lt', 1, []),
      new ItemType(undefined, 'Prosciutto', 'Gr', 100, []),
      new ItemType(undefined, 'Dentifricio', 'Pz', 1, []),
    ];
  };
}

export default ItemType;
