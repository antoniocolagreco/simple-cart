import { ChangeEvent, FocusEvent, FormEvent, useContext, useState } from 'react';
import SmallViewContainer from '../components/SmallViewContainer';
import AuthContext, { LoginOutcome } from '../contexts/AuthContext';

import ChevronRight from '../icons/ChevronRight';
import css from './LoginView.module.css';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

const LoginView = (props: LoginViewProps) => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [emailEdited, setEmailEdited] = useState<boolean>(false);
  const [emailServerValid, setEmailServerValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [passwordEdited, setPasswordEdited] = useState<boolean>(false);
  const [passwordServerValid, setPasswordServerValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailIsValid = email.match(emailRegex) !== null;
  const passwordIsValid = password.match(passwordRegex) !== null;

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailEdited(false);
    setEmailServerValid(true);
  };

  const emailBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setEmailEdited(true);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordEdited(false);
    setPasswordServerValid(true);
  };

  const passwordBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setPasswordEdited(true);
  };

  const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailEdited(true);
    setPasswordEdited(true);

    if (emailIsValid && passwordIsValid) {
      setIsLoading(true);
      const outcome: LoginOutcome = await authContext.login(email, password);
      switch (outcome) {
        case LoginOutcome.OK:
          props.onSuccess();
          break;
        case LoginOutcome.USER_NOT_FOUND:
          setEmailServerValid(false);
          setIsLoading(false);
          break;
        case LoginOutcome.WRONG_PASSWORD:
          setPasswordServerValid(false);
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          break;
      }
    }
  };

  return (
    <SmallViewContainer iSLoading={isLoading}>
      <form className={css['login-form']} onSubmit={loginHandler} noValidate>
        <div>
          <input
            type='email'
            placeholder='Inserisci il tuo indirizzo email'
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={(!emailIsValid || !emailServerValid) && emailEdited ? 'invalid' : ''}
          />
          {!emailIsValid && emailEdited && <p className={css['error-message']}>L'indirizzo email non è valido</p>}
          {!emailServerValid && emailEdited && <p className={css['error-message']}>Utente non trovato. Registrati.</p>}
        </div>
        <div>
          <input
            type='password'
            placeholder='Inserisci una password'
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={(!passwordIsValid || !passwordServerValid) && passwordEdited ? 'invalid' : ''}
          />
          {!passwordIsValid && passwordEdited && (
            <p className={css['error-message']}>
              La password non è valida. E' necessario inserire almeno 8 caratteri, 1 lettera minuscola, 1 maiuscola ed 1
              numero.
            </p>
          )}
          {!passwordServerValid && passwordEdited && <p className={css['error-message']}>Password errata.</p>}
        </div>
        <button className={css['login-button']} type='submit'>
          Accedi
        </button>
        <div className={css['signup-container']}>
          Non hai un account?{' '}
          <button className={css['signup-button']} onClick={props.onSignup}>
            Registrati
            <ChevronRight className={css['signup-icon']} />
          </button>
        </div>
      </form>
    </SmallViewContainer>
  );
};

export default LoginView;

interface LoginViewProps {
  onSignup(): void;
  onSuccess(): void;
}
