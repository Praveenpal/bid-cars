import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
  return (
    <Footer style={styles.footer}>
      <Text style={styles.text}>&copy; 2023 Autobidmaster Clone. All rights reserved.</Text>
    </Footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#001529',
    color: '#fff',
  },
  text: {
    color: '#fff',
  },
};

export default AppFooter;