import { useContext, useState } from 'react';
import Header from './components/Header';
import Login from './views/Login';
import Signin from './views/Signin';
import UserContext, { UserContextProvider } from './context/UserContext';

function App() {
  const userContext = useContext(UserContext);
  const [signin, setSignin] = useState(false);

  const onSignin = (): void => {
    setSignin(true);
  };

  return (
    <UserContextProvider>
      <Header />
      <main>
        <div className='page-container'>
          {!userContext.user.isLoggedIn && !signin && <Login onSignin={onSignin} />}
          {!userContext.user.isLoggedIn && signin && <Signin />}
        </div>
      </main>
    </UserContextProvider>
  );
}

export default App;
