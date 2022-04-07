import React, { useState } from 'react';

function DragBox({ dataItem, children }) {
  const [dragging, setDragging] = useState(false);

  const startDrag = (event) => {
    setDragging(true);
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
