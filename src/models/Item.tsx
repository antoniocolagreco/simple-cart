import ItemCategory from './ItemCategory';

class Item {
  id: string;
  name: string;
  measureUnit: string;
  measureUnitStep: number;
  categories: ItemCategory[];

  constructor(id: string, name: string, measureUnit: string, measureUnitStep: number, categories: ItemCategory[]) {
    this.id = id;
    this.name = name;
    this.measureUnit = measureUnit;
    this.measureUnitStep = measureUnitStep;
    this.categories = categories;
  }
}

export default Item;
