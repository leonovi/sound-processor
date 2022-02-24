import React, { FC } from 'react';

import './ContextMenu.css';

const contextMenuItems = [
  {
    items: [{ label: 'Noise', nodeType: 'Noise' }],
    label: 'Sources',
  },
  {
    items: [{ label: 'Destination', nodeType: 'destination' }],
    label: 'Destinations',
  },
];

type ContextMenuPropsT = {
  addNode: (type: string) => void;
};

const ContextMenu: FC<ContextMenuPropsT> = ({ addNode }) => {
  return (
    <ul className="context-menu">
      {contextMenuItems.map((item) => (
        <li key={item.label}>
          {item.label}
          <span>&#x276F;</span>
          {item.items && (
            <ul className="context-menu sub">
              {item.items.map((subItem) => (
                <li
                  key={subItem.label}
                  onClick={() => addNode(subItem.nodeType)}
                >
                  {subItem.label}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export { ContextMenu };
