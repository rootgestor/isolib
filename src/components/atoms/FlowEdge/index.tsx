import React from 'react';
import { getBezierPath } from 'reactflow';
import type { BezierEdgeProps } from 'reactflow';

interface FlowEdgeProps extends Omit<BezierEdgeProps, 'id'> {
  id?: string;
}

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
}: FlowEdgeProps): JSX.Element => {
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
        <g
          transform={`translate(${X}, ${Y})`}
          onClick={() => data?.onClick(node, edge)}
        >
          <rect
            x="-10"
            y="-10"
            width="18"
            ry="4"
            rx="4"
            height="18"
            fill="white"
            stroke={mainColor}
          ></rect>
          <text fill={mainColor} y="3" x="-5">
            +
          </text>
        </g>
      )}
    </>
  );
};

/**
 * 
  
 */
