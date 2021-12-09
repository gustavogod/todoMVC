import { observer } from "mobx-react-lite";
import { Button, Checkbox, Col, Row, Typography } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Item = ({ item, index }) => {
  let textAttrs = {};
  if (item.done) {
    textAttrs = {
      type: 'secondary',
      delete: true
    }
  } else {
    textAttrs = {
      editable: {
        onChange: item.changeValue //já recebe function(string) por padrão
      }
    }
  }

  return (
    <Draggable draggableId={item.key} index={index}>
      {
        (provided, dnd) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Row
                gutter={8}
                style={{
                  padding: '8px',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: dnd.isDragging ? 'lightgreen' : 'inherit'
                }}  
              >
                <Col>
                  <Checkbox checked={item.done} onChange={e => { item.toggleDone() }} />
                </Col>
                <Col flex='auto'>
                  <Text {...textAttrs}>{item.value}</Text>
                </Col>
                <Col>
                  <Button type='danger' onClick={() => { item.remove() }}>
                    <DeleteOutlined/>
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      }
    </Draggable>
  );
}

export default observer(Item);