import React, { FC } from 'react';
import {
  EdgeProps as EdgePropsT,
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from 'react-flow-renderer';

import './Edge.css';

const FOREIGN_OBJECT_SIZE = 20;

const Edge: FC<EdgePropsT> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const { onEdgeButtonClick } = data;

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={FOREIGN_OBJECT_SIZE}
        height={FOREIGN_OBJECT_SIZE}
        x={edgeCenterX - FOREIGN_OBJECT_SIZE / 2}
        y={edgeCenterY - FOREIGN_OBJECT_SIZE / 2}
        className="edge__foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button className="edge__button" onClick={() => onEdgeButtonClick(id)}>
            ✕
          </button>
        </body>
      </foreignObject>
    </>
  );
};

export { Edge };
