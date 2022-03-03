import React, { FC, useState } from 'react';

import {
  DEFAULT_SELECTOR_OPTION,
  SelectorControllerProps,
} from 'components/Controllers/SelectorController/SelectorController.models';
import { SelectorControllerMenu } from 'components/Controllers/SelectorController/SelectorControllerMenu/SelectorControllerMenu';
import { SelectorOption } from 'components/Controllers/SelectorController/SelectorOption/SelectorOption';
import { SelectorArrow } from 'components/Controllers/SelectorController/SelectorArrow/SelectorArrow';

import b_ from 'b_';
import './SelectorController.css';

const b = b_.with('selector-controller');

const SelectorController: FC<SelectorControllerProps> = ({ options }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((isExpanded) => !isExpanded);
  };

  const { onClick, children } =
    options.find(({ selected }) => selected) || DEFAULT_SELECTOR_OPTION;

  return (
    <div className={b()} onClick={toggleExpanded}>
      <SelectorArrow reverse />
      <SelectorOption selected onClick={onClick}>
        {children}
      </SelectorOption>

      {isExpanded && <SelectorControllerMenu options={options} />}
    </div>
  );
};

export { SelectorController };
