import { useContext, useState } from 'react';
import Header from './components/Header';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import AuthContext from './contexts/AuthContext';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CartView from './views/CartView';
import AddItemView from './views/AddItemView';
import LoadingMask from './components/UI/LoadingMask';
import ItemType from './models/ItemType';
import { AnimatePresence } from 'framer-motion';

export enum Views {
  LOGIN = 'login',
  SIGNUP = 'signup',
  CART = 'cart',
  ADD = 'add',
}

function App() {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const nav = useNavigate();
  const allItems = useState<ItemType[]>(ItemType.getDummyData());

  return (
    <>
      <Header onLogout={() => nav(Views.LOGIN)} />
      <AnimatePresence exitBeforeEnter>
        {!authContext.isLoadingUser && (
          <Routes location={location} key={location.pathname}>
            {authContext.isLoggedIn() && (
              <>
                <Route path={Views.CART} element={<CartView />} />
                <Route path={Views.ADD} element={<AddItemView />} />
                <Route path='*' element={<Navigate to={Views.CART} />} />
              </>
            )}
            {!authContext.isLoggedIn() && (
              <>
                <Route
                  path='/login'
                  element={<LoginView onSignup={() => nav(Views.SIGNUP)} onSuccess={() => nav(Views.CART)} />}
                />
                <Route
                  path='/signup'
                  element={<SignupView onCancel={() => nav(Views.LOGIN)} onSuccess={() => nav(Views.CART)} />}
                />
                <Route path='*' element={<Navigate to='/login' />} />
              </>
            )}
          </Routes>
        )}
      </AnimatePresence>
      <LoadingMask isVisible={authContext.isLoadingUser} label='Authenticating...' />
    </>
  );
}

export default App;
