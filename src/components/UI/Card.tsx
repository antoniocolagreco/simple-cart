import { ReactNode } from 'react';
import LoadingMask from './LoadingMask';
import css from './Card.module.css';
import { motion, Transition, Variants } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const variants: Variants = {
  out: { y: '100vh', opacity: 0 },
  in: { y: '0vh', opacity: 1 },
};

const transition: Transition = { ease: 'easeOut', duration: 0.2 };

const Card = (props: CardProps) => {
  return (
    <motion.div variants={variants} className={css.card} initial='out' exit='out' animate='in' transition={transition}>
      {props.children}
      <LoadingMask isVisible={props.iSLoading} />
    </motion.div>
  );
};
export default Card;

interface CardProps {
  children?: ReactNode;
  iSLoading?: boolean;
}
