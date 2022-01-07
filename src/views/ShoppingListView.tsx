import { motion } from 'framer-motion';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import DB, { DBOutcome } from '../api/DB';
import { Views } from '../App';
import MenuButton from '../components/UI/Buttons/MenuButton';
import Sheet from '../components/UI/Containers/Sheet';
import ViewContainer from '../components/UI/Containers/ViewContainer';
import Icon, { IconType } from '../components/UI/Icon';
import AuthContext from '../contexts/AuthContext';
import ShoppingList from '../models/ShoppingList';
import css from './ShoppingListView.module.css';

interface Props {}

const ShoppingListView = (props: Props) => {
  const authContext = useContext(AuthContext);
  const { id } = useParams();

  const currentShoppingList: ShoppingList | undefined = authContext.profile!.shoppingLists.find((sl) => {
    return sl.id === id;
  });

  const footerBar = document.getElementById('footer-bar');

  const deleteShoppingList = async () => {
    if (currentShoppingList !== undefined && authContext.profile !== null) {
      const dbResult = await DB.deleteShoppingList(currentShoppingList, authContext.profile);
      switch (dbResult.dbOutcome) {
        case DBOutcome.ERROR:
          break;
        case DBOutcome.OK:
          break;
      }
    }
  };

  return (
    <>
      {footerBar &&
        createPortal(
          <>
            <MenuButton label='Indietro' icon={IconType.CHEVRON_LEFT} to={Views.SHOPPING_LISTS} />
            <MenuButton label='Elimina' icon={IconType.TRASH} />
            <MenuButton label='Aggiungi' icon={IconType.ADD_ITEM} />
            <MenuButton label='Condividi' icon={IconType.USERS} />
          </>,
          footerBar
        )}
      <ViewContainer>
        <Sheet>
          <h4>{currentShoppingList?.name}</h4>
          <ul className={css['shopping-list-ul']}>
            {currentShoppingList?.itemsToBuy.map((item) => {
              return (
                <li key={item.id} className={css['shopping-list-li']}>
                  <motion.div
                    className={css['shopping-list-li-container']}
                    drag='x'
                    dragSnapToOrigin
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                  >
                    <Icon className={css.check} type={IconType.CHECK} />
                    <div>{item.itemType.name}</div>
                    <div>{item.amount + ' ' + item.itemType.measureUnit.symbol}</div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </Sheet>
      </ViewContainer>
    </>
  );
};

export default ShoppingListView;
