import React, { useState } from 'react';

type DragContainerProps = {
  dataItem?: string;
  children?: React.ReactNode;
};

function DragBox({ dataItem, children }: DragContainerProps) {
  const [dragging, setDragging] = useState(false);

  const startDrag = (event) => {
    event.dataTransfer.setData('drag-item', dataItem);
  };
  const stopDrag = () => setDragging(false);

  return (
    <div
      draggable
      data-item={dataItem}
      onDragStart={startDrag}
      onDragEnd={stopDrag}
    >
      {children}
    </div>
  );
}

export default DragBox;
