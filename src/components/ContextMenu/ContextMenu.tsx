import React, { FC } from 'react';
import b_ from 'b_';
import './ContextMenu.css';
import { isEmptyArray } from 'utils/isEmpty';
import { ContextMenuPropsT } from './ContextMenu.models';
import { contextMenuData } from 'data/contextMenu';

const b = b_.with('context-menu');

const ContextMenu: FC<ContextMenuPropsT> = ({ addNode }) => (
  <ul className={b()}>
    {contextMenuData.map(({ category, items }) => (
      <li key={category} className={b('item')}>
        <span>{category}</span>
        <span className={b('item-arrow')}>‣</span>

        {!isEmptyArray(items) && (
          <ul className={b('sub-menu')}>
            {items.map(({ label, nodeType }) => (
              <li
                key={label}
                className={b('item')}
                onClick={() => addNode(nodeType, category)}
              >
                <span>{label}</span>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

export { ContextMenu };
