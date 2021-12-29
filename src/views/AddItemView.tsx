import React from 'react';
import Card from '../components/UI/Card';
import ViewContainer from '../components/UI/ViewContainer';
import css from './AddItemView.module.css';

interface Props {}

const AddItemView = (props: Props) => {
  return (
    <ViewContainer>
      <Card iSLoading={false}>
        <form className={css['add-item-form']}>
          <div>
            <input placeholder='name' type='text'></input>
          </div>
          <div>
            <select>
              <option value=''>Seleziona una unità di misura</option>
              <option value='Kg'>Chili</option>
              <option value='Gr'>Grammi</option>
              <option value='Lt'>Litri</option>
              <option value='Ml'>Millilitri</option>
              <option value='Pz'>Pezzo</option>
            </select>
          </div>
          <div>
            <input placeholder='measure unit step' type='number'></input>
          </div>
          <button className={css['add-item-button']} type='submit'>
            Aggiungi
          </button>
        </form>
      </Card>
    </ViewContainer>
  );
};

export default AddItemView;
