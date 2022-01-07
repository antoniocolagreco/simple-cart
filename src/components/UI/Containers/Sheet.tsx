import { ReactNode } from 'react';
import LoadingMask from '../LoadingMask';
import css from './Sheet.module.css';
import { motion, Transition, Variants } from 'framer-motion';

const variants: Variants = {
  out: { y: '100vh', opacity: 0 },
  in: { y: '0vh', opacity: 1 },
};

const transition: Transition = { ease: 'easeInOut', duration: 0.2 };

const Sheet = (props: Props) => {
  return (
    <motion.div variants={variants} className={css.sheet} initial='out' exit='out' animate='in' transition={transition}>
      {props.children}
      <LoadingMask isVisible={props.iSLoading} />
    </motion.div>
  );
};
export default Sheet;

interface Props {
  children?: ReactNode;
  iSLoading?: boolean;
}
