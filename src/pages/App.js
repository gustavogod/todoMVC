/* eslint-disable no-restricted-globals */
import { observer } from 'mobx-react';

import logo from '../assets/images/logo.png';
import InputForm from '../components/InputForm';
import ItemsList from '../components/ItemsList';

import { Image, Space, Typography, Layout, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title, Text, Link } = Typography;

const App = ({ toDoList, filter }) => {
    
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header>
          <Space align="center">
            <Image src={logo} alt="logo" width={165} />
            <Title>Looplex TodoMVC</Title>
          </Space>
        </Header>
  
  
        <Content>
          <Row justify="center" style={{rowGap: '0px'}}>
            <Col lg={12} sm={20} xs={22}>
              <InputForm toDoList={toDoList} filter={filter} />
              {
                toDoList.items.length > 0
                ?
                <ItemsList toDoList={toDoList} filter={filter} />
                :
                null
              }
            </Col>
          </Row>
        </Content>
  
  
        <Footer>
          <Text type="secondary">
            Made with ❤️ by&nbsp;
            <Link href="https://github.com/gustavogod" target="_blank">
              Gustavo Dias
            </Link> 
            .&nbsp;Based on&nbsp;
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
  };


export default observer(App);
