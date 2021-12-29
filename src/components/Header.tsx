import { useContext, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import AddItemIcon from '../icons/AddItemIcon';
import ListIcon from '../icons/ListIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import css from './Header.module.css';

const Header = (props: HeaderProps) => {
  const authContext = useContext(AuthContext);

  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    authContext.logout();
    props.onLogout();
  };

  return (
    <>
      <header className={css.header}>
        <div className={css['header-bar']}>
          <div className={css['title-container']}>
            <ShoppingCartIcon className={css.logo} />
            <h1 className={css.title}>Simple Cart</h1>
          </div>
          {authContext.isLoggedIn() && (
            <nav className={css.menu}>
              <NavLink to='cart' className={css['menu-button']}>
                <div className={css['menu-button-content']}>
                  <ShoppingCartIcon className={css['menu-icon']} />
                  <span>Carrello</span>
                </div>
              </NavLink>
              <NavLink to='add' className={css['menu-button']}>
                <div className={css['menu-button-content']}>
                  <AddItemIcon className={css['menu-icon']} />
                  <span>Aggiungi</span>
                </div>
              </NavLink>
            </nav>
          )}
          {authContext.isLoggedIn() && (
            <div className={css['user-container']}>
              <button onClick={logout} className={css['user-button']}>
                <div className={css['menu-button-content']}>
                  <span> {authContext.user?.displayName}</span>
                  <ListIcon className={css['user-icon']} />
                </div>
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

interface HeaderProps {
  onLogout(): void;
}
