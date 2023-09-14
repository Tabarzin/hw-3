import cn from 'classnames';
import * as React from 'react';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, disabled, ...props }, ref) => {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return (
      <label className={cn('input-wrapper', disabled && 'input-wrapper_disabled', className)}>
        <input
          value={value}
          onChange={handleChange}
          type="text"
          className="input"
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {!!afterSlot && <div className="input-after">{afterSlot}</div>}
      </label>
    );
  },
);
export default Input;
