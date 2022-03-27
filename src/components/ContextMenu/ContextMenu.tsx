import React, { FC } from 'react';
import { isEmptyArray } from 'utils/isEmpty';
import b_ from 'b_';
import './ContextMenu.css';

import { ContextMenuPropsT } from './ContextMenu.models';
import { ContextMenuItemsData } from './ContextMenu.data';

const b = b_.with('context-menu');

const ContextMenu: FC<ContextMenuPropsT> = ({ addNode }) => {
  return (
    <ul className={b()}>
      {ContextMenuItemsData.map((item) => {
        const { label, items } = item;

        // TODO make react components
        return (
          <li key={label} className={b('item')}>
            <span>{label}</span>
            <span className={b('item-arrow')}>‣</span>

            {!isEmptyArray(items) && (
              <ul className={b('sub-menu')}>
                {items.map(({ label, nodeType }) => (
                  <li
                    key={label}
                    className={b('item')}
                    onClick={() => addNode(nodeType)}
                  >
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export { ContextMenu };
