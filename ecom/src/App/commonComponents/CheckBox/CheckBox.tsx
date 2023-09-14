import cn from 'classnames';
import * as React from 'react';
import './CheckBox.scss';

import CheckIcon from '@App/commonComponents/icons/CheckIcon';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  className?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, disabled, className, ...props }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  // const handleInputChange = React.useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     onChange(event.target.checked);
  //   },
  //   [onChange]
  // );

  return (
    <label className={cn('checkbox-wrapper', disabled && 'checkbox-wrapper_disabled', className)}>
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
        disabled={disabled}
        {...props}
      />
      <CheckIcon width={40} height={40} className="checkbox__mark" />
    </label>
  );
};

export default CheckBox;
