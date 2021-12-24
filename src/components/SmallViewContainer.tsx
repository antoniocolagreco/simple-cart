import { ReactNode } from 'react';
import LoadingIcon from '../icons/LoadingIcon';
import css from './SmallViewContainer.module.css';

const SmallViewContainer = (props: SmallViewContainer) => {
  return (
    <div className={css.container}>
      {props.children}
      {props.iSLoading && (
        <div className={css['loading-mask']}>
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};
export default SmallViewContainer;

interface SmallViewContainer {
  children: ReactNode;
  iSLoading: boolean;
}
