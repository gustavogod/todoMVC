import { observer } from 'mobx-react';

import logo from '../assets/images/logo.png';
import InputForm from '../components/InputForm';

import { Image, Space, Typography, Layout, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title, Text, Link } = Typography;

const App = observer(({ toDoList }) => {
    
    return (
      <Layout>
        <Header>
          <Space align="center">
            <Image src={logo} alt="logo" width={165} />
            <Title>Looplex TodoMVC</Title>
          </Space>
        </Header>
  
  
        <Content>
          <Row justify="center">
            <Col span={12}>
              <InputForm toDoList={toDoList} />
            </Col>
          </Row>
        </Content>
  
  
        <Footer>
          <Text type="secondary">
            Made with ❤️ by Gustavo Dias. Based on&nbsp;
            <Link
              href="https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality" 
              target="_blank"
            > 
              TodoMVC functionality
            </Link>.
          </Text>
        </Footer>
      </Layout>
    );
  }
); 

export default App;
