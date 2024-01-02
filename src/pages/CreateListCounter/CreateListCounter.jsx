// CreateListCounter.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CreateListCounter = () => {
  const initialItems = [
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    // ...add more items as needed
  ];

  const [items, setItems] = React.useState(initialItems);
  const [rows, setRows] = React.useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  const addRow = () => {
    const newRow = {
      id: `row-${rows.length + 1}`,
      columns: [
        {
          id: `col-1-${rows.length + 1}`,
          items: [
            { id: `item-col1-${rows.length + 1}-1`, content: 'Column 1 Item 1' },
            { id: `item-col1-${rows.length + 1}-2`, content: 'Column 1 Item 2' },
            // ...add more items for column 1 as needed
          ],
        },
        {
          id: `col-2-${rows.length + 1}`,
          items: [
            { id: `item-col2-${rows.length + 1}-1`, content: 'Column 2 Item 1' },
            { id: `item-col2-${rows.length + 1}-2`, content: 'Column 2 Item 2' },
            // ...add more items for column 2 as needed
          ],
        },
      ],
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list-group"
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-group-item"
                        >
                          {item.content}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <button className="btn btn-primary" onClick={addRow}>
            Agregar Fila
          </button>
        </div>
      </div>
      {rows.map((row) => (
        <div className="row mt-3" key={row.id}>
          {row.columns.map((col) => (
            <div className="col-md-6" key={col.id}>
              <Droppable droppableId={col.id} key={col.id}>
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="list-group"
                  >
                    {col.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="list-group-item"
                          >
                            {item.content}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CreateListCounter;
