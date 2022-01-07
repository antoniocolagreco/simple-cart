import React from 'react';
import { NavLink } from 'react-router-dom';
import { Views } from '../../../App';
import Icon, { IconType } from '../Icon';
import css from './MenuButton.module.css';

export enum MenuButtonColor {
  DEFAULT = 'default',
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

interface Props {
  label?: string;
  to?: Views;
  icon: IconType;
  onClick?(): void;
  buttonColor?: MenuButtonColor;
}

const MenuButton = (props: Props) => {
  const buttonColor = props.buttonColor ? ' ' + css[props.buttonColor] : '';

  return (
    <>
      {props.to ? (
        <NavLink to={props.to} className={css['menu-button'] + buttonColor}>
          <div className={css['menu-button-content']}>
            <Icon type={props.icon} className={css['menu-button-icon']} />
            <div className={css['menu-button-text']}>{props.label}</div>
          </div>
        </NavLink>
      ) : (
        <a className={css['menu-button'] + buttonColor} onClick={props.onClick}>
          <div className={css['menu-button-content']}>
            <Icon type={props.icon} className={css['menu-button-icon']} />
            <div className={css['menu-button-text']}>{props.label}</div>
          </div>
        </a>
      )}
    </>
  );
};

export default MenuButton;
