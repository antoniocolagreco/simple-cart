import { Link } from 'react-router-dom';
import { Views } from '../App';
import ShoppingList from '../models/ShoppingList';
import css from './ShoppingListItem.module.css';

interface Props {
  shoppingList: ShoppingList;
}

const ShoppingListItem = (props: Props) => {
  return (
    <Link to={Views.VIEW_SHOPPING_LIST + props.shoppingList.id} className={css['shopping-list-link']}>
      <h4>{props.shoppingList.name}</h4>
    </Link>
  );
};

export default ShoppingListItem;
