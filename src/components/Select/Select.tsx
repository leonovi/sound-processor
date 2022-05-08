import React from 'react';
import cn from 'classnames';
import b_ from 'b_';
import './Select.css';
import { capitalize } from 'utils/capitalize';

type SelectPropsT<T> = {
  options: Array<T>;
  selected: T;
  onChange: (selectedOption: T) => void;
  className: string;
};

const b = b_.with('select');

const Select = <T extends string>({
  options,
  selected,
  onChange,
  className,
}: SelectPropsT<T>) => {
  return (
    <select
      className={cn(b(), className)}
      value={selected}
      onChange={(event) => {
        onChange(event.target.value as T);
      }}
    >
      {options.map((option) => (
        <option
          key={option}
          className={b('option')}
          value={option}
        >
          {capitalize(option)}
        </option>
      ))}
    </select>
  );
};

export { Select };
