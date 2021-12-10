import { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Form, Input, Button, Tooltip } from "antd";
import { EnterOutlined, ScheduleTwoTone } from '@ant-design/icons';

const InputForm = ({ toDoList, filter }) => {
  const inputRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  function handleFinish (values) {
    const newItem = values.item;
    toDoList.add(newItem);
    form.resetFields();
    inputRef.current.focus();
    if (filter.state === 'COMPLETED') filter.changeState('ALL');
  }

  function handleSetAllClick () {
    toDoList.toggleAll();
  }
  
  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        size="large"
      >
        <Form.Item
          name="item"
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Type a task!'
            }
          ]}
          style={{margin: '0px'}}
        >
          <Input
            ref={inputRef}
            placeholder="What needs to be done?"
            prefix={
              <Tooltip 
                placement="bottom"
                title={<span>Mark all items as {toDoList.itemsLeft() ? 'completed' : 'active'}</span>}
              >
              <Button type="text" onClick={handleSetAllClick}>
                <ScheduleTwoTone />
              </Button>
              </Tooltip>
            }
            suffix={
              <Tooltip placement="bottom" title={<span>Add item</span>}>
                <Button type="text" htmlType="submit">
                <EnterOutlined style={{color: '#1890FF'}} />
                </Button>
              </Tooltip>
            }
          />

        </Form.Item>
      </Form>

    </>
  );
}

export default observer(InputForm);