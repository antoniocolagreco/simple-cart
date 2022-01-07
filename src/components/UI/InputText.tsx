import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';

const genericRegex = /(.*?)/;
const simpleNameRegex = /[\p{L}]+/gmu;

interface Props {
  label: string;
  type?: undefined | 'simpleName' | 'personName' | 'email' | 'password';
  onValueChange(value: string): void;
  onValidtyChange(value: boolean): void;
  errorMessage: string;
}

const InputText = (props: Props) => {
  let regex = genericRegex;
  const [value, setValue] = useState<string>('');
  const [valueEdited, setValueEdited] = useState<boolean>(false);
  const [outsideValid, setOutsideValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const regexValid = value.match(regex) !== null;

  let type: React.HTMLInputTypeAttribute;
  switch (props.type) {
    case 'email':
      type = 'email';
      break;
    case 'password':
      type = 'password';
      break;
    default:
      type = 'text';
      break;
  }

  useEffect(() => {
    setOutsideValid(false);
    setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValueEdited(false);
    setOutsideValid(true);
    setValue(event.target.value);
  };

  const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setValueEdited(true);
  };

  return (
    <div>
      <input
        placeholder={props.label}
        type={type}
        value={value}
        onChange={valueChangeHandler}
        onBlur={blurHandler}
        className={(!regexValid || !outsideValid) && valueEdited ? 'invalid' : ''}
      />
      <ErrorMessage condition={!regexValid && valueEdited}>Nome non valido.</ErrorMessage>
      <ErrorMessage condition={!outsideValid && valueEdited}>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default InputText;
