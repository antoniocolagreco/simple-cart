import { useState, ChangeEvent, FormEvent } from 'react';
import css from './Signin.module.css';

enum Validity {
  VIRGIN,
  INVALID,
  VALID,
}

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
const nameRegex = /^[a-zA-Z_\-]+$/;

const formatName = (name: string): string => {
  return name.toLowerCase().replace(/^\w/, (char) => char.toUpperCase());
};

const Signin = (props: SigninProps) => {
  const [email, setEmail] = useState<string>('');
  const [emailIsValid, setEmailIsValid] = useState<Validity>(Validity.VIRGIN);
  const [password, setPassword] = useState<string>('');
  const [passwordIsValid, setPasswordIsValid] = useState<Validity>(Validity.VIRGIN);
  const [name, setName] = useState<string>('');
  const [nameIsValid, setNameIsValid] = useState<Validity>(Validity.VIRGIN);
  const [surname, setSurname] = useState<string>('');
  const [surnameIsValid, setSurnameIsValid] = useState<Validity>(Validity.VIRGIN);

  const validateEmail = () => {
    if (email.match(emailRegex)) {
      setEmailIsValid(Validity.VALID);
    } else {
      setEmailIsValid(Validity.INVALID);
    }
  };
  const validatePassword = () => {
    if (password.match(passwordRegex)) {
      setPasswordIsValid(Validity.VALID);
    } else {
      setPasswordIsValid(Validity.INVALID);
    }
  };
  const validateName = () => {
    if (name.match(nameRegex)) {
      console.log('valid');
      setNameIsValid(Validity.VALID);
    } else {
      console.log('invalid');
      setNameIsValid(Validity.INVALID);
    }
  };
  const validateSurname = () => {
    if (surname.match(nameRegex)) {
      setSurnameIsValid(Validity.VALID);
    } else {
      setSurnameIsValid(Validity.INVALID);
    }
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailIsValid(Validity.VIRGIN);
  };
  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordIsValid(Validity.VIRGIN);
  };
  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameIsValid(Validity.VIRGIN);
  };
  const surnameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
    setSurnameIsValid(Validity.VIRGIN);
  };

  const signinHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateEmail();
    validatePassword();
    validateName();
    validateSurname();
  };

  return (
    <form className='container' onSubmit={signinHandler}>
      <div>
        <input
          type='email'
          placeholder='Inserisci il tuo indirizzo email'
          value={email}
          onChange={emailChangeHandler}
          onBlur={validateEmail}
          className={emailIsValid === Validity.INVALID ? 'invalid' : ''}
          formNoValidate
        />
        {emailIsValid === Validity.INVALID && <p className={css['error-message']}>L'indirizzo email non è valido</p>}
      </div>
      <div>
        <input
          type='password'
          formNoValidate
          placeholder='Inserisci una password'
          value={password}
          onChange={passwordChangeHandler}
          onBlur={validatePassword}
          className={passwordIsValid === Validity.INVALID ? 'invalid' : ''}
        />
        {passwordIsValid === Validity.INVALID && (
          <p className={css['error-message']}>
            La password non è valida. E' necessario inserire almeno 8 caratteri, 1 lettera minuscola, 1 maiuscola ed 1
            numero.
          </p>
        )}
      </div>
      <div>
        <input
          type='text'
          placeholder='Inserisci il tuo nome'
          value={name}
          onChange={nameChangeHandler}
          onBlur={validateName}
          className={nameIsValid === Validity.INVALID ? 'invalid' : ''}
        />
        {nameIsValid === Validity.INVALID && <p className={css['error-message']}>Nome non valido</p>}
      </div>
      <div>
        <input
          type='text'
          placeholder='Inserisci il tuo cognome'
          value={surname}
          onChange={surnameChangeHandler}
          onBlur={validateSurname}
          className={surnameIsValid === Validity.INVALID ? 'invalid' : ''}
        />
        {surnameIsValid === Validity.INVALID && <p className={css['error-message']}>Cognome non valido</p>}
      </div>
      <button type='submit' className={css['signin-button']}>
        Registrati
      </button>
    </form>
  );
};

export default Signin;

interface SigninProps {}
