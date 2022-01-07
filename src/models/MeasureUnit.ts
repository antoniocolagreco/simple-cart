import { stringify } from 'querystring';

export default interface MeasureUnit {
  id: string;
  description: string;
  symbol: string;
}

export const MeasureUnits = new Map<string, MeasureUnit>([
  [
    'mu_pz',
    {
      id: 'mu_pz',
      description: 'pezzi',
      symbol: 'pz',
    },
  ],
  [
    'mu_gr',
    {
      id: 'mu_gr',
      description: 'grammi',
      symbol: 'gr',
    },
  ],
  [
    'mu_kg',
    {
      id: 'mu_kg',
      description: 'chili',
      symbol: 'Kg',
    },
  ],
  [
    'mu_ml',
    {
      id: 'mu_ml',
      description: 'millilitri',
      symbol: 'ml',
    },
  ],

  [
    'mu_l',
    {
      id: 'mu_l',
      description: 'litri',
      symbol: 'L ',
    },
  ],
]);

export const getMeasureUnitById = (id: string): MeasureUnit => {
  return MeasureUnits.get(id)!;
};
