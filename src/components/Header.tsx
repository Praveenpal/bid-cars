import { Layout, Button, Avatar, Typography, Grid } from 'antd';
import { GlobalOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import './styles/header.css';
import SearchInput from './SearchInput';

const { useBreakpoint } = Grid;

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {

  const screens = useBreakpoint(); // 

  const logoSize = screens.md ? 4 : 5 

  return (
    <>
      <Header style={styles.header} className="header">
        {/* Logo on the left */}
        <div style={styles.logo}>
          <Title level={logoSize} style={styles.title} >
            {/* <Link to="/" style={{color:'#fffff'}}> */}
            USA Cars ASI Company
            {/* <img src={logo} alt="car-logo" style={styles.logoImage} /> */}
            {/* </Link> */}
          </Title>
        </div>

        {screens.md && <div style={styles.searchContainer}>
          <SearchInput />
        </div>}

        {/* Buttons on the right */}
        <div style={styles.buttonContainer}>
          {screens.md && <Button type="text" style={styles.signInButton}>
            <Avatar size="small" icon={<UserOutlined />} style={styles.avatar} />
            SIGN IN
          </Button>}
          <Button type="primary" style={styles.registerButton}>
            REGISTER NOW
          </Button>
        </div>
      </Header>
      {screens.lg && <div className='navigation-panel'>
        <ul className='left-nav-panel'>
          <li className='nav-toggle'>How to Buy</li>
          <li className='nav-toggle'>Find Vehicles</li>
          <li className='nav-toggle'>Live Auctions</li>
          <li className='nav-toggle'>Shipping</li>
        </ul>
        <ul className='right-nav-panel'>
          <li className='nav-toggle'> <GlobalOutlined />&nbsp;English</li>
          <li className='nav-toggle'><Map />&nbsp;India</li>
          <li className='nav-toggle'><PhoneOutlined />&nbsp;Sales Office</li>
        </ul>
      </div>}
    </>
  );
};

const Map = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 36.767 48">
  <g fill="#ffffff">
    <path d="M23.143 37.881c4.178-6.076 9.957-15.809 9.957-23.164a14.718 14.718 0 0 0-29.435 0c0 7.357 5.783 17.094 9.961 23.168C6.3 38.391 0 40.074 0 42.858 0 46.235 9.248 48 18.383 48s18.384-1.766 18.384-5.143c0-2.782-6.293-4.47-13.624-4.976zM5.121 14.717a13.264 13.264 0 0 1 26.527 0c0 9.492-10.665 23.852-13.264 27.209-2.598-3.357-13.263-17.713-13.263-27.209zm13.262 31.829c-10.334 0-16.929-2.184-16.929-3.688 0-1.309 5.03-3.123 13.155-3.57a91.912 91.912 0 0 0 3.209 4.273.729.729 0 0 0 1.129 0 93.58 93.58 0 0 0 3.213-4.277c8.125.447 13.151 2.266 13.151 3.574.002 1.504-6.593 3.688-16.928 3.688z" />
    <path d="M26.383 14.848a8 8 0 1 0-8 8 8.009 8.009 0 0 0 8-8zm-14.545 0a6.546 6.546 0 1 1 6.545 6.545 6.555 6.555 0 0 1-6.545-6.545z" />
  </g>
</svg>


const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    top: 0,
    backgroundColor: '#4F359B',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    color: 'white'
  },
  logoImage: {
    height: '40px',
  },
  searchContainer: {
    flex: 1,
    margin: '0 24px',
    maxWidth: '450px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    width: '100%',
  },
  searchIcon: {
    backgroundColor: '#FFC107',
    color: '#000',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  signInButton: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',
    gap: '8px',
  },
  avatar: {
    backgroundColor: '#f0f0f0',
    color: 'black'
  },
  registerButton: {
    backgroundColor: '#FFC107',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
  },
};

export default AppHeader;