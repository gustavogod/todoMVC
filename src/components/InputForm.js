import { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Form, Input, Button } from "antd";
import { ScheduleTwoTone } from '@ant-design/icons';

const InputForm = ({ toDoList }) => {
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
              message: 'Digite uma tarefa!',
            },
          ]}
          style={{margin: '0px'}}
        >
          <Input
            ref={inputRef}
            placeholder="What needs to be done?"
            prefix={
              <Button type="text" onClick={handleSetAllClick}>
                <ScheduleTwoTone />
              </Button>
            }
          //Quando for criar a chave, tem q ver se tem caracteres especiais e converter para um caractere normal
          />

        </Form.Item>
      </Form>

    </>
  );
}

export default observer(InputForm);