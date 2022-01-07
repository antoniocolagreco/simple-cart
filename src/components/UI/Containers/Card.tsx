import { ReactNode } from 'react';
import LoadingMask from '../LoadingMask';
import css from './Card.module.css';
import './CardInputs.css';
import { motion, Transition, Variants } from 'framer-motion';

const variants: Variants = {
  out: { y: '100vh', opacity: 0 },
  in: { y: '0vh', opacity: 1 },
};

const transition: Transition = { ease: 'easeInOut', duration: 0.2 };

const Card = (props: Props) => {
  return (
    <motion.div variants={variants} className={css.card} initial='out' exit='out' animate='in' transition={transition}>
      {props.children}
      <LoadingMask isVisible={props.iSLoading} />
    </motion.div>
  );
};
export default Card;

interface Props {
  children?: ReactNode;
  iSLoading?: boolean;
}
