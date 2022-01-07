import MeasureUnit from './MeasureUnit';

export default interface ItemType {
  id: string;
  category?: boolean;
  name: string;
  measureUnit: MeasureUnit;
  categories?: ItemType[];
}

export interface ItemType_DB {
  id: string;
  category?: boolean;
  name: string;
  measureUnit: string;
  categories?: string[];
}
