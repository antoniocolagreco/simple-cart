import { useContext, useState } from 'react';
import Header from './components/Header';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import AuthContext from './contexts/AuthContext';
import WelcomeView from './views/WelcomeView';

export enum Views {
  LOGIN,
  SIGNUP,
  WELCOME,
}

function App() {
  const authContext = useContext(AuthContext);
  const [currentView, setCurrentView] = useState<Views>(Views.LOGIN);

  const goToLogin = () => {
    setCurrentView(Views.LOGIN);
  };
  const goToSignup = () => {
    setCurrentView(Views.SIGNUP);
  };
  const goToWelcome = () => {
    setCurrentView(Views.WELCOME);
  };

  return (
    <>
      <Header onLogout={goToLogin} />
      <main>
        <div className='page-container'>
          {!authContext.isInitialising && !authContext.isLoggedIn() && currentView === Views.LOGIN && (
            <LoginView onSignup={goToSignup} onSuccess={goToWelcome} />
          )}
          {!authContext.isInitialising && !authContext.isLoggedIn() && currentView === Views.SIGNUP && (
            <SignupView onCancel={goToLogin} onSuccess={goToWelcome} />
          )}
          {!authContext.isInitialising && authContext.isLoggedIn() && currentView === Views.WELCOME && <WelcomeView />}
        </div>
      </main>
    </>
  );
}

export default App;
