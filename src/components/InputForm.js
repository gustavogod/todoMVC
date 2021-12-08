import { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Form, Input, Button } from "antd";
import { ScheduleTwoTone } from '@ant-design/icons';


import { ToDoListItem } from "../models/ToDoList";

const InputForm = () => {
  const inputRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  function handleFinish (values) {
    form.resetFields();
    inputRef.current.focus();
  }

  function handleSetAllClick (e) {

  }

  //importar o item da lista e criar quando der o input
  //quando for criar, a função tem que verificar se o item já existe e então 

  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        //onFinishFailed={}
        size="large"
      >
        <Form.Item
          name="item"
          id="item"
          rules={[
            {
              required: true,
              message: 'Digite uma tarefa!',
            },
          ]}
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