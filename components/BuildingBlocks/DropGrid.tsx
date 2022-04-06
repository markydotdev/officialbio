import React from 'react';

import Card from './Card';
import DropTarget from './DropTarget';

const DropGrid = () => {
  const [items, setItems] = React.useState([]);

  const itemDropped = (item) => setItems([...items, item]);
  return (
    <DropTarget itemDropped={itemDropped}>
      {items.map((item) => (
        <Card type='square' key={item}>
          {item}
        </Card>
      ))}
    </DropTarget>
  );
};

export default DropGrid;
