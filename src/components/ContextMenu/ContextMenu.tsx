import React, { FC } from 'react';
import b_ from 'b_';
import './ContextMenu.css';
import { isEmptyArray } from 'utils/isEmpty';
import {
  NodeCategories,
  NodeTypes,
} from 'components/Nodes/models';
import {
  ContextMenuItemT,
  ContextMenuPropsT,
  OnChooseItemFuncT,
} from './ContextMenu.models';
import { contextMenuConfig } from './ContextMenu.config';

const b = b_.with('context-menu');

type ItemPropsT = {
  category: NodeCategories;
  label: string;
  nodeType: NodeTypes;
  onChooseItem: OnChooseItemFuncT;
};

const Item: FC<ItemPropsT> = ({
  category,
  label,
  nodeType,
  onChooseItem,
}) => (
  <li
    key={label}
    className={b('item')}
    onClick={() => onChooseItem(nodeType, category)}
  >
    <span>{label}</span>
  </li>
);

type CategoryPropsT = {
  category: NodeCategories;
  items: Array<ContextMenuItemT>;
  onChooseItem: OnChooseItemFuncT;
};

const Category: FC<CategoryPropsT> = ({
  category,
  items,
  onChooseItem,
}) => (
  <li key={category} className={b('item')}>
    <span>{category}</span>
    <span className={b('arrow')}>‣</span>

    {!isEmptyArray(items) && (
      <ul className={b({ sub: true })}>
        {items.map(({ label, nodeType }) => (
          <Item
            key={nodeType}
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

const ContextMenu: FC<ContextMenuPropsT> = ({
  onChooseItem,
}) => (
  <ul className={b()}>
    {contextMenuConfig.map(({ category, items }) => (
      <Category
        key={category}
        category={category}
        items={items}
        onChooseItem={onChooseItem}
      />
    ))}
  </ul>
);

export { ContextMenu };
