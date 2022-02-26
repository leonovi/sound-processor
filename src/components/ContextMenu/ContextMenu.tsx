import React, { FC } from 'react';

import { isEmpty } from 'utils/isEmpty';
import { NodeTypes } from 'utils/nodeTypes';

import { contextMenuItems } from './contextMenuItems';

import b_ from 'b_';
import './ContextMenu.css';

type ContextMenuPropsT = {
  addNode: (type: NodeTypes) => void;
};

const b = b_.with('context-menu');

const ContextMenu: FC<ContextMenuPropsT> = ({ addNode }) => {
  return (
    <ul className={b()}>
      {contextMenuItems.map((item) => {
        const { label, items } = item;

        // TODO make react components
        return (
          <li key={label} className={b('item')}>
            <span>{label}</span>
            <span className={b('item-arrow')}>‣</span> {/* TODO make svg icon */}

            {!isEmpty(items) && (
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
