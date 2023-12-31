import cn from 'classnames';
import * as React from 'react';
import './MultiDropdown.scss';
import Input from '@App/commonComponents/Input';

import ArrowDownIcon from '@App/commonComponents/icons/ArrowDownIcon';
import Text from '@App/commonComponents/Text';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  const selectedSet = React.useMemo(() => new Set(value), [value]);

  const filteredOptions = React.useMemo(
    () => options.filter((o) => o.value.toLowerCase().includes(filter.toLowerCase())),
    [options, filter],
  );

  const onClickDropdown = React.useCallback(() => {
    if (disabled) {
      return;
    }
    setIsOpen(true);
    setIsTyping(true);
  }, [disabled]);

  const onClickOption = (selectedOption: Option) => () => {
    if (disabled) {
      return;
    }

    setIsTyping(false);
    if (selectedSet.has(selectedOption)) {
      onChange(value.filter((o) => o.key !== selectedOption.key));
      return;
    }

    onChange([...value, selectedOption]);
  };

  React.useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Element)) {
        setIsOpen(false);
        setIsTyping(false);
        setFilter('');
      }
    };
    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  React.useEffect(() => {
    if (disabled) {
      setIsOpen(false);
      setIsTyping(false);
      setFilter('');
    }
  }, [disabled]);

  const title = React.useMemo(() => getTitle(value), [getTitle, value]);
  const inputValue = React.useMemo(() => {
    if (!isOpen) {
      if (value.length === 0) {
        return '';
      }
      return title;
    }
    if (isTyping) {
      return filter;
    }
    return '';
  }, [isOpen, isTyping, value.length, title, filter]);

  return (
    <div
      className={cn('dropdown', isOpen && 'dropdown_open', disabled && 'dropdown_disabled', className)}
      ref={rootRef}
    >
      <Input
        className="dropdown__input"
        value={inputValue}
        placeholder={title}
        onChange={setFilter}
        onClick={onClickDropdown}
        afterSlot={<ArrowDownIcon color="secondary" width={24} height={24} />}
      />
      {isOpen && (
        <div className="dropdown__options">
          {filteredOptions.map((o) => (
            <button
              key={o.key}
              className={cn('dropdown__option', selectedSet.has(o) && 'dropdown__option_selected')}
              onClick={onClickOption(o)}
            >
              <Text view="p-16">{o.value}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default MultiDropdown;
