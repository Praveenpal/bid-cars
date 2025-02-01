import { ConfigProvider, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import "./App.css"
import "./index.css"
import { styleToken } from './styles/antStyle/antStyleToken';

const { Content } = Layout;

const App = () => {
  return (
    <ConfigProvider
      theme={styleToken}
    >
      <Layout style={styles.layout}>
        <AppHeader />
        <Content style={styles.content}>
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </ConfigProvider>
  );
};

const styles = {
  layout: {
    minHeight: '100vh',
  },
  content: {
    padding: '10px',
    backgroundColor: '#fff',
  },
};

export default App;