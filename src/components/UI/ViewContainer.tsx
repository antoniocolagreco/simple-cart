import React, { ReactNode } from 'react';
import css from './ViewContainer.module.css';

interface Props {
  children: ReactNode;
  centered?: boolean;
}

const ViewContainer = (props: Props) => {
  return <main className={css['view-main'] + ' ' + (props.centered ? css.centered : '')}>{props.children}</main>;
};

export default ViewContainer;
