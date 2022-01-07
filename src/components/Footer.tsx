import React, { ReactNode } from 'react';
import css from './Footer.module.css';

interface Props {
  children?: ReactNode;
}

const Footer = (props: Props) => {
  return (
    <footer className={css.footer}>
      <div className={css['footer-bar']} id='footer-bar'>
        {props.children}
      </div>
    </footer>
  );
};

export default Footer;
