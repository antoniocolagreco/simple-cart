import { ChangeEvent, FocusEvent, FormEvent, useContext, useState } from 'react';
import SimpleButton, { ButtonColor } from '../components/UI/Buttons/SimpleButton';
import Card from '../components/UI/Containers/Card';
import ErrorMessage from '../components/UI/ErrorMessage';
import { IconType } from '../components/UI/Icon';
import AuthContext, { SignupOutcome } from '../contexts/AuthContext';
import css from './SignupView.module.css';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
const nameRegex = /^([\p{L}']+ )+[\p{L}']+$|^[\p{L}']+$/gmu;

const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[\w]*/gu, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    .replace(/  +/gu, ' ')
    .replace(/^ *| *$/, '');
};

const SignupView = (props: SignupViewProps) => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [emailEdited, setEmailEdited] = useState<boolean>(false);
  const [emailServerValid, setEmailServerValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [passwordEdited, setPasswordEdited] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [nameEdited, setNameEdited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailIsValid = email.match(emailRegex) !== null;
  const passwordIsValid = password.match(passwordRegex) !== null;
  const nameIsValid = name.match(nameRegex) !== null;

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
  };

  const passwordBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setPasswordEdited(true);
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameEdited(false);
  };

  const nameBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setName(formatName(event.target.value));
    setNameEdited(true);
  };

  const signupHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setName((prev) => formatName(prev));

    setEmailEdited(true);
    setPasswordEdited(true);
    setNameEdited(true);

    if (emailIsValid && passwordIsValid && nameIsValid) {
      setIsLoading(true);
      const outcome = await authContext.signup(email, password, name);
      switch (outcome) {
        case SignupOutcome.OK:
          // props.onSuccess();
          break;
        case SignupOutcome.EMAIL_ALREADY_IN_USE:
          setEmailServerValid(false);
          setIsLoading(false);
          break;
        default:
          setEmailServerValid(false);
          setIsLoading(false);
          break;
      }
    }
  };

  return (
    <Card iSLoading={isLoading}>
      <form className={css['signup-form']} onSubmit={signupHandler} noValidate>
        <div>
          <input
            type='email'
            placeholder='Inserisci il tuo indirizzo email'
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={(!emailIsValid || !emailServerValid) && emailEdited ? 'invalid' : ''}
          />
          <ErrorMessage condition={!emailIsValid && emailEdited}>L'indirizzo email non è valido.</ErrorMessage>
          <ErrorMessage condition={!emailServerValid && emailEdited}>Indirizzo email già in uso.</ErrorMessage>
        </div>
        <div>
          <input
            type='password'
            formNoValidate
            placeholder='Inserisci una password'
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={!passwordIsValid && passwordEdited ? 'invalid' : ''}
          />
          <ErrorMessage condition={!passwordIsValid && passwordEdited}>
            La password non è valida. E' necessario inserire almeno 8 caratteri, 1 lettera minuscola, 1 maiuscola ed 1
            numero.
          </ErrorMessage>
        </div>
        <div>
          <input
            type='text'
            placeholder='Inserisci il tuo nome'
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            className={!nameIsValid && nameEdited ? 'invalid' : ''}
          />
          <ErrorMessage condition={!nameIsValid && nameEdited}>Nome non valido</ErrorMessage>
        </div>
        <SimpleButton type='submit' label='Registrati' />
        <div className={css['cancel-container']}>
          <SimpleButton
            onClick={props.onCancel}
            buttonColor={ButtonColor.CANCEL}
            icon={IconType.CHEVRON_LEFT}
            label='Annulla'
            iconFirst={true}
          />
        </div>
      </form>
    </Card>
  );
};

export default SignupView;

interface SignupViewProps {
  onCancel(): void;
  // onSuccess(): void;
}
