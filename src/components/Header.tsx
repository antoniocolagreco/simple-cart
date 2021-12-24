import { useContext, MouseEvent } from 'react';
import AuthContext from '../contexts/AuthContext';
import AddItemIcon from '../icons/AddItemIcon';
import SettingsIcon from '../icons/SettingsIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import ShoppingListsIcon from '../icons/ShoppingListsIcon';
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
              <button>
                <div className={css['menu-button-content']}>
                  <ShoppingCartIcon className={css['menu-icon']} />
                  <span>Carrello</span>
                </div>
              </button>
              <button>
                <div className={css['menu-button-content']}>
                  <AddItemIcon className={css['menu-icon']} />
                  <span>Aggiungi</span>
                </div>
              </button>
              <button>
                <div className={css['menu-button-content']}>
                  <ShoppingListsIcon className={css['menu-icon']} />
                  <span>Liste</span>
                </div>
              </button>
              <button>
                <div className={css['menu-button-content']}>
                  <SettingsIcon className={css['menu-icon']} />
                  <span>Impostazioni</span>
                </div>
              </button>

              <button onClick={logout}>
                <div className={css['menu-button-content']}>
                  <span> {authContext.user?.displayName}</span>
                </div>
              </button>
            </nav>
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
