import LoadingIcon from '../../icons/LoadingIcon';
import css from './LoadingMask.module.css';

interface Props {
  isVisible?: boolean;
  label?: string;
}

const LoadingMask = (props: Props) => {
  return (
    <>
      {props.isVisible && (
        <div className={css['loading-mask']}>
          <LoadingIcon />
          <span>{props.label}</span>
        </div>
      )}
    </>
  );
};

export default LoadingMask;
