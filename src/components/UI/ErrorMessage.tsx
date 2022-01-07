import React, { ReactNode } from 'react';
import css from './ErrorMessage.module.css';

interface Props {
  children: ReactNode;
  condition: boolean;
}

const ErrorMessage = (props: Props) => {
  return <>{props.condition && <p className={css['error-message']}>{props.children}</p>}</>;
};

export default ErrorMessage;
