import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import LoadingMask from './components/UI/LoadingMask';
import AuthContext from './contexts/AuthContext';
import AddShoppingListView from './views/AddShoppingListView';
import LoginView from './views/LoginView';
import ShoppingListsView from './views/ShoppingListsView';
import ShoppingListView from './views/ShoppingListView';
import SignupView from './views/SignupView';

export enum Views {
  LOGIN = '/login/',
  SIGNUP = '/signup/',
  SHOPPING_LISTS = '/lists/',
  VIEW_SHOPPING_LIST = 'view/',
  ADD_SHOPPING_LIST = 'add/',
}

function App() {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const nav = useNavigate();

  return (
    <>
      <Header onLogout={() => nav(Views.LOGIN)} />
      <main>
        <AnimatePresence exitBeforeEnter>
          {!authContext.isLoadingUser && (
            <Routes location={location} key={location.pathname}>
              {authContext.isLoggedIn() && (
                <>
                  <Route path={Views.SHOPPING_LISTS} element={<ShoppingListsView />} />
                  <Route
                    path={Views.SHOPPING_LISTS + Views.VIEW_SHOPPING_LIST + ':id'}
                    element={<ShoppingListView />}
                  />
                  <Route path={Views.SHOPPING_LISTS + Views.ADD_SHOPPING_LIST} element={<AddShoppingListView />} />
                  <Route path={Views.LOGIN} element={<LoginView onSignup={() => nav(Views.SIGNUP)} />} />
                  <Route path={Views.SIGNUP} element={<SignupView onCancel={() => nav(Views.LOGIN)} />} />
                  <Route path='*' element={<Navigate to={Views.SHOPPING_LISTS} />} />
                </>
              )}
              {!authContext.isLoggedIn() && (
                <>
                  <Route path={Views.LOGIN} element={<LoginView onSignup={() => nav(Views.SIGNUP)} />} />
                  <Route path={Views.SIGNUP} element={<SignupView onCancel={() => nav(Views.LOGIN)} />} />
                  <Route path='*' element={<Navigate to='/login' />} />
                </>
              )}
            </Routes>
          )}
        </AnimatePresence>
      </main>
      {authContext.isLoggedIn() && <Footer />}
      <LoadingMask isVisible={authContext.isLoadingUser} label='Authenticating...' />
    </>
  );
}

export default App;
