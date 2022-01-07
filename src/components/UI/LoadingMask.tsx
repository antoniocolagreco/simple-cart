import Icon, { IconType } from './Icon';
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
          <Icon type={IconType.LOADING} />
          <span>{props.label}</span>
        </div>
      )}
    </>
  );
};

export default LoadingMask;
