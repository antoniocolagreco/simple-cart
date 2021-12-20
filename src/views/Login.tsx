import { ChangeEvent, MouseEventHandler, useState } from 'react';

import ChevronRight from '../icons/ChevronRight';
import css from './Login.module.css';

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form className='container'>
      <input type='email' placeholder='Inserisci il tuo indirizzo email' value={email} onChange={emailChangeHandler} />
      <input
        type='password'
        placeholder='Inserisci la tua password'
        value={password}
        onChange={passwordChangeHandler}
      />
      <button className={css['login-button']} type='submit'>
        Accedi
      </button>
      <div className={css['signin-container']}>
        Non hai un account?{' '}
        <button className={css['signin-button']} onClick={props.onSignin}>
          Registrati
          <ChevronRight className={css['signin-icon']} />
        </button>
      </div>
    </form>
  );
};

export default Login;

interface LoginProps {
  onSignin(): void;
}
