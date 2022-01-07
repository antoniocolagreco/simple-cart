import React, { ReactNode } from 'react';
import css from './ViewContainer.module.css';

interface Props {
  children: ReactNode;
}

const ViewContainer = (props: Props) => {
  return <div className={css['view-container']}>{props.children}</div>;
};

export default ViewContainer;
