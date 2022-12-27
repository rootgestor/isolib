import React from 'react';
import { getBezierPath } from 'reactflow';

export const FlowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: any): JSX.Element => {
  const mainColor = '#b1b1b7';
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0,
  });

  const X = (sourceX + targetX) / 2;
  const Y = (sourceY + targetY) / 2;
  const node = data.target;
  const edge = id;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {!data?.static && (
        <>
          <g
            transform={`translate(${X}, ${Y})`}
            onClick={() => data?.onAdd(node, edge)}
          >
            <rect
              x="-10"
              y="-20"
              width="18"
              ry="4"
              rx="4"
              height="18"
              fill="white"
              stroke={mainColor}
            ></rect>
            <text fill={mainColor} y="-7" x="-5">
              +
            </text>
          </g>
          <g
            transform={`translate(${X}, ${Y})`}
            onClick={() => data?.onRemove(edge)}
          >
            <rect
              x="-10"
              y="2"
              width="18"
              ry="4"
              rx="4"
              height="18"
              fill="white"
              stroke={mainColor}
            ></rect>
            <text fill={mainColor} y="15" x="-4">
              -
            </text>
          </g>
        </>
      )}
    </>
  );
};

/**
 * 
  
 */
