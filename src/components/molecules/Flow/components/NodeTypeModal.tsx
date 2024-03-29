import React, { useState } from 'react';
import Modal from 'antd/lib/modal';

import Button from '../../../molecules/Button';
import { useTranslate } from '../../../../hooks/useTrasnlate';

import type { NoteTypeModalProps, payloadType } from '../typings';

const NodeTypeModal = ({
  id,
  icon,
  label,
  i18n,
  modal,
  onSubmit,
}: NoteTypeModalProps) => {
  const tt = useTranslate(i18n);

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);

  const handleClick = () => {
    if (modal) {
      setIsOpen(true);
    } else {
      onSubmit({});
    }
  };

  const handleSubmit = (payload: payloadType) => {
    onSubmit(payload);
    handleCloseModal();
  };

  return (
    <>
      <Button
        key={id}
        icon={icon}
        onClick={handleClick}
        size="bigger"
        className="flow-modal-add-item"
      >
        {label}
      </Button>
      {!!modal && (
        <Modal
          title={tt('Add node')}
          open={isOpen}
          onCancel={handleCloseModal}
          footer={[<Button onClick={handleCloseModal}>{tt('Close')}</Button>]}
        >
          {modal({ onSubmit: handleSubmit })}
        </Modal>
      )}
    </>
  );
};

export default NodeTypeModal;
