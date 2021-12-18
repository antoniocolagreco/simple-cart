import AddItemIcon from '../icons/AddItemIcon';
import SettingsIcon from '../icons/SettingsIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import ShoppingListsIcon from '../icons/ShoppingListsIcon';
import css from './Header.module.css';

const Header = (props: HeaderProps) => {
  return (
    <header className={css.header}>
      <div className={css['header-bar']}>
        <div className={css['title-container']}>
          <ShoppingCartIcon className={css.logo} />
          <h1 className={css.title}>Simple Cart</h1>
        </div>
        <div>User</div>
      </div>
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
      </nav>
    </header>
  );
};

export default Header;

interface HeaderProps {}
