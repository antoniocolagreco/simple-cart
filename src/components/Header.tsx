import { useContext, MouseEvent } from 'react';
import AuthContext from '../contexts/AuthContext';
import css from './Header.module.css';
import Icon, { IconType } from './UI/Icon';

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
            <Icon type={IconType.CART} className={css.logo} />
            <h1 className={css.title}>Simple Cart</h1>
          </div>

          {authContext.isLoggedIn() && (
            <button onClick={logout} className={css['user-button']}>
              <div className={css['menu-button-content']}>
                <span> {authContext.user?.displayName}</span>
                <Icon type={IconType.USER} className={css['user-icon']} />
              </div>
            </button>
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
