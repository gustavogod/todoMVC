import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, Card, Radio, Typography } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Item from './Item';

const { Text } = Typography;

const ItemsList = ({ toDoList }) => {
  const [filter, setFilter] = useState('ALL');

  function handleRadioGroupChange (e) {
    const filter = e.target.value;
    setFilter(filter);
  }

  const itemsLeft = toDoList.items.filter( item => !item.done );
  const hasCompleted = itemsLeft.length < toDoList.items.length;

  return (
    <Card
      actions={[
        <Text key="itemsLeft">
          { `${itemsLeft.length} item${itemsLeft.length > 1 ? 's' : ''} left` }
        </Text>,
        <Radio.Group 
          key="filters" 
          size="small" 
          buttonStyle="solid" 
          defaultValue="ALL"
          onChange={handleRadioGroupChange}
        >
          <Radio.Button value="ALL">All</Radio.Button>
          <Radio.Button value="ACTIVE">Active</Radio.Button>
          <Radio.Button value="COMPLETED">Completed</Radio.Button>
        </Radio.Group>,
        ( hasCompleted ? 
          <Button key="clearComplete" size='small' onClick={e => { toDoList.removeDoneItems() }}>
            Clear completed
          </Button>
          :
          null
        )
      ]}
      bodyStyle={{ padding: 0 }}
    >
      <DragDropContext
        onDragEnd={result => {
          const { destination, source } = result;
          if (!destination) return; //se soltar fora do DragDropContext
          if (destination.droppableId === source.droppableId && destination === source.index) return;
          toDoList.reorder(source.index, destination.index);
        }}
      >
        <Droppable droppableId="items">
          {
            (provided, dnd) => {
              return (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  style={{
                    transition: 'background-color 0.2s ease',
                    backgroundColor: dnd.isDraggingOver ? 'cornsilk' : 'inherit',
                    padding: '16px'
                  }}
                >
                  {
                    toDoList.getFilteredItems(filter).map((item, index) => 
                      <Item key={item.key} item={item} index={index} />
                    )
                  }
                  { provided.placeholder }
                </div>
              );
            }
          }
        </Droppable>
      </DragDropContext>
    </Card>
  );
}

export default observer(ItemsList);