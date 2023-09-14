import cn from 'classnames';
import * as React from 'react';
import './Button.scss';
import Loader from '../Loader';
import Text from '../Text';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children = null, className, ...props }) => {
  return (
    <button
      className={cn(className, 'button', props.disabled && 'button_disabled')}
      {...props}
      disabled={props.disabled || loading}
    >
      {loading && <Loader className="button__loader" size="s" />}
      <Text className="button__text" tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
