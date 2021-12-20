import React, { ReactNode, useState } from 'react';
import ShoppingList from '../models/ShoppingList';
import User, { getEmptyUser } from '../models/User';

const context = {
  user: getEmptyUser(),
  onLogin: (email: string, password: string): void => {},
  onLogout: (): void => {},
};

const UserContext = React.createContext(context);

export default UserContext;

export const UserContextProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(getEmptyUser());

  const loginHandler = (email: string, password: string) => {};
  const logoutHandler = () => {};

  return (
    <UserContext.Provider value={{ user: user, onLogin: loginHandler, onLogout: logoutHandler }}>
      {props.children}
    </UserContext.Provider>
  );
};
