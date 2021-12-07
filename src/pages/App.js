import logo from '../assets/images/logo.png';
import { Image, Space, Typography } from 'antd';

const { Title } = Typography;

function App() {
  return (
    <div className="app">
      <header>
        <Space align="center">
          <Image src={logo} alt="logo" width={165} />
          <Title>Looplex TodoMVC</Title>
        </Space>
      </header>

      <main>
        main
      </main>
      
      <footer>
        footer
      </footer>
    </div>
  );
}

export default App;
