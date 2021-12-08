import logo from '../assets/images/logo.png';
import { Image, Space, Typography, Layout } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title, Text, Link } = Typography;

function App() {
  return (
    <Layout>
      <Header>
        <Space align="center">
          <Image src={logo} alt="logo" width={165} />
          <Title>Looplex TodoMVC</Title>
        </Space>
      </Header>

      <Content>
        main
      </Content>
      <Footer>
        <Text type="secondary">
          Made with ❤️ by Gustavo Dias. Based on 
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

export default App;
