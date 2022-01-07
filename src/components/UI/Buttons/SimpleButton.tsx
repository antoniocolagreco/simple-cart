import React, { MouseEvent, useMemo } from 'react';
import Icon, { IconType } from '../Icon';
import css from './SimpleButton.module.css';

export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OK = 'ok',
  CANCEL = 'cancel',
}

interface Props {
  iconFirst?: boolean;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  buttonColor?: ButtonColor;
  icon?: IconType;
  onClick?(): void;
}

const SimpleButton = (props: Props) =>
  useMemo(() => {
    let buttonColor: string;
    switch (props.buttonColor) {
      case ButtonColor.SECONDARY:
        buttonColor = css.secondary;
        break;
      case ButtonColor.CANCEL:
        buttonColor = css.cancel;
        break;
      case ButtonColor.OK:
        buttonColor = css.ok;
        break;
      default:
        buttonColor = css.primary;
        break;
    }

    const buttonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick();
      }
    };

    const type = props.type === undefined ? 'button' : props.type;

    // console.log(type);

    return (
      <button className={css['simple-button'] + ' ' + buttonColor} onClick={buttonClickHandler} type={type}>
        {!props.iconFirst && props.label}
        {props.icon && <Icon className={css.icon} type={props.icon} />}
        {props.iconFirst && props.label}
      </button>
    );
  }, []);

export default SimpleButton;
