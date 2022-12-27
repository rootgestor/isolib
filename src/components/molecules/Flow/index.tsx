import React, { useRef, useState, useEffect } from 'react';
import ReactFlow, { Controls } from 'reactflow';
import Modal from 'antd/lib/modal';

import Button from '../../molecules/Button';
import * as FlowNode from '../../atoms/FlowNode';
import * as FlowEdge from '../../atoms/FlowEdge';
import { useTranslate } from '../../../hooks/useTrasnlate';
import NodeTypeModal from './components/NodeTypeModal';
import useFlow from './hooks/useFlow';

import type { FlowProps, FlowContainerRef } from './typings';

// import './styles.less';

const Flow = (props: FlowProps) => {
  const containerRef: FlowContainerRef = useRef(null);
  const tt = useTranslate(props.i18n);
  const [horizontal, setHorizontal] = useState(0);
  const [isOpen, openModal] = useState(false);

  const { defaultNodes, draggable, onChange } = props;
  const flowParams = { defaultNodes, onChange, openModal, draggable };

  const flow = useFlow(flowParams);

  const handleCloseModal = () => openModal(false);

  useEffect(() => {
    const width = containerRef.current?.offsetWidth;
    if (width) {
      const x = width / 2 - 150;
      setHorizontal(x);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="react-flow-global-container"
      style={{ width: '100%', height: '100vh' }}
    >
      {horizontal && (
        <>
          <ReactFlow
            {...flow}
            edgeTypes={FlowEdge}
            nodeTypes={FlowNode}
            snapToGrid={true}
            defaultViewport={{
              x: horizontal,
              y: 0,
              zoom: 2,
            }}
            minZoom={1}
            maxZoom={2}
            attributionPosition="bottom-left"
          >
            <Controls showInteractive={false} />
          </ReactFlow>
          {props.nodeTypes && (
            <Modal
              title={tt('Add node')}
              open={isOpen}
              onCancel={handleCloseModal}
              footer={[
                <Button onClick={handleCloseModal}>{tt('Close')}</Button>,
              ]}
            >
              <div className="flow-modal-add-container">
                {props.nodeTypes.map((node) => (
                  <NodeTypeModal
                    key={node.id}
                    {...node}
                    onSubmit={flow.handleAdd(node)}
                    i18n={props.i18n}
                  />
                ))}
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Flow;
