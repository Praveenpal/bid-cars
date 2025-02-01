import { Layout, Row, Col, Typography, Divider } from 'antd';
import { PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={styles.footer}>
      <Row gutter={[24, 24]} style={styles.text}>
        <Col xs={24} sm={12} md={6}>
          <Text strong className='white-text'>International Sales Department</Text>
          <div>
            <PhoneOutlined /> +1 (971) 308-9263
          </div>
          <div>
            <MailOutlined /> export@autobidmaster.com
          </div>
          <div>
            <ClockCircleOutlined /> Monday-Friday, 06:00AM-02:00PM
          </div>
          <Text className='white-text'>700 N Hayden Island Dr, Ste 100, Portland, OR 97217, United States</Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className='white-text'>Quick Links</Text>
          <div><Link href="#">Vehicle Finder</Link></div>
          <div><Link href="#">Auto Auctions</Link></div>
          <div><Link href="#">Support</Link></div>
          <div><Link href="#">Services</Link></div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className='white-text'>Company Information</Text>
          <div><Link href="#">About AutoBioMaster</Link></div>
          <div><Link href="#">Blog</Link></div>
          <div><Link href="#">Careers</Link></div>
          <div><Link href="#">Contact Us</Link></div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className='white-text'>Legal</Text>
          <div><Link href="#">Terms and Conditions</Link></div>
          <div><Link href="#">Privacy Policy</Link></div>
          <div><Link href="#">Rules and Policies</Link></div>
        </Col>
      </Row>
      <Divider />
      <Row justify="center">
        <Col>
          <Text className='white-text'>Copyright © 2025 AutoBioMaster. LLC All Rights Reserved.</Text>
        </Col>
      </Row>
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