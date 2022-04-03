import React, { FC } from 'react';
import b_ from 'b_';
import './ContextMenu.css';
import { isEmptyArray } from 'utils/isEmpty';
import { bind } from 'utils/bind';
import { NodeTypes } from 'components/Nodes/models';
import {
  ContextMenuItemsT,
  ContextMenuItemT,
  ContextMenuPropsT,
} from './ContextMenu.models';
import { contextMenuData } from 'data/contextMenu';

const renderItem = (
  addNode: (type: NodeTypes) => void,
  { label, nodeType }: ContextMenuItemT
) => (
  <li key={label} className={b('item')} onClick={() => addNode(nodeType)}>
    <span>{label}</span>
  </li>
);

const renderCategory = (
  addNode: (type: NodeTypes) => void,
  { label, items }: ContextMenuItemsT[0]
) => (
  <li key={label} className={b('item')}>
    <span>{label}</span>
    <span className={b('item-arrow')}>‣</span>

    {!isEmptyArray(items) && (
      <ul className={b('sub-menu')}>{items.map(bind(renderItem, addNode))}</ul>
    )}
  </li>
);

const b = b_.with('context-menu');

const ContextMenu: FC<ContextMenuPropsT> = ({ addNode }) => (
  <ul className={b()}>{contextMenuData.map(bind(renderCategory, addNode))}</ul>
);

export { ContextMenu };
