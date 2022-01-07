import { motion, Variants } from 'framer-motion';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Views } from '../App';
import ShoppingListItem from '../components/ShoppingListItem';
import MenuButton from '../components/UI/Buttons/MenuButton';
import ViewContainer from '../components/UI/Containers/ViewContainer';
import { IconType } from '../components/UI/Icon';
import AuthContext from '../contexts/AuthContext';
import css from './ShoppingListsView.module.css';

interface Props {}

const variants_ul: Variants = {
  in: {
    y: '0vh',
    opacity: 1,
    transition: { ease: 'easeOut', duration: 0.2, staggerChildren: 0.1, staggerDirection: 1 },
  },
  out: {
    y: '100vh',
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.2, staggerChildren: 0.02, staggerDirection: -1 },
  },
};
const variants_li: Variants = {
  in: { y: '0vh', opacity: 1, transition: { ease: 'easeOut', duration: 0.2 } },
  out: { y: '100vh', opacity: 0, transition: { ease: 'easeIn', duration: 0.1 } },
};

const ShoppingListsView = (props: Props) => {
  const authContext = useContext(AuthContext);
  const footerBar = document.getElementById('footer-bar');

  return (
    <>
      {footerBar &&
        createPortal(
          <>
            <MenuButton label='Aggiungi' to={Views.ADD_SHOPPING_LIST} icon={IconType.ADD_DOCUMENT} />
          </>,
          footerBar
        )}

      <ViewContainer>
        <motion.ul
          variants={variants_ul}
          initial='out'
          exit='out'
          animate='in'
          className={css['shopping-lists-container']}
        >
          {authContext.profile &&
            authContext.profile.shoppingLists.map((shoppingList) => {
              return (
                <motion.li variants={variants_li} key={shoppingList.id + '_li'}>
                  <ShoppingListItem shoppingList={shoppingList} key={shoppingList.id} />
                </motion.li>
              );
            })}
        </motion.ul>
      </ViewContainer>
    </>
  );
};

export default ShoppingListsView;
