import React, { memo } from 'react';
import { Position, Handle } from 'reactflow';
import Icon from '../Icon';

export const FlowNode = memo(({ data }: any) => {
  const { icon, label, onRemove, color = '#6938fb' } = data;
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="react-flow__custom-node">
        <div
          className="react-flow__custom-node-container"
          style={{ borderColor: color }}
        >
          <div
            className="react-flow__custom-node-header"
            style={{ background: color }}
          >
            <span className="react-flow__custom-node-header-icon">
              <Icon src={icon} />
            </span>
            {!data?.static && (
              <span
                className="react-flow__custom-node-header-close"
                onClick={onRemove}
              >
                <Icon src="CloseCircleFilled" />
              </span>
            )}
          </div>
          <div className="react-flow__custom-node-label">{label}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ bottom: 10, top: 'auto' }}
      />
    </>
  );
});
