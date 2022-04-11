import React, { FC } from 'react';
import b_ from 'b_';
import './ContextMenu.css';
import { isEmptyArray } from 'utils/isEmpty';
import { ContextMenuItemT, ContextMenuPropsT } from './ContextMenu.models';
import { NodeCategories, NodeTypes } from 'components/Nodes/models';
import { contextMenuData } from 'data/contextMenu';

const b = b_.with('context-menu');

const Item: FC<{
  category: NodeCategories;
  label: string;
  nodeType: NodeTypes;
  onChooseItem: (type: NodeTypes, category: NodeCategories) => void;
}> = ({ category, label, nodeType, onChooseItem }) => (
  <li
    key={label}
    className={b('item')}
    onClick={() => onChooseItem(nodeType, category)}
  >
    <span>{label}</span>
  </li>
);

const Category: FC<{
  category: NodeCategories;
  items: Array<ContextMenuItemT>;
  onChooseItem: (type: NodeTypes, category: NodeCategories) => void;
}> = ({ category, items, onChooseItem }) => (
  <li key={category} className={b('item')}>
    <span>{category}</span>
    <span className={b('arrow')}>‣</span>
    {!isEmptyArray(items) && (
      <ul className={b({ sub: true })}>
        {items.map(({ label, nodeType }) => (
          <Item
            category={category}
            label={label}
            nodeType={nodeType}
            onChooseItem={onChooseItem}
          />
        ))}
      </ul>
    )}
  </li>
);

const ContextMenu: FC<ContextMenuPropsT> = ({ addNode }) => (
  <ul className={b()}>
    {contextMenuData.map(({ category, items }) => (
      <Category category={category} items={items} onChooseItem={addNode} />
    ))}
  </ul>
);

export { ContextMenu };
