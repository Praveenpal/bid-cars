import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Button, Avatar, Typography,Grid } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../assets/abm-logo.svg';
import './styles/header.css';

const { useBreakpoint } = Grid;

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

const AppHeader = () => {

  const screens = useBreakpoint(); // 
  
  return (
    <Header style={styles.header} className="header">
      {/* Logo on the left */}
      <div style={styles.logo}>
        <Title level={3} style={styles.title}>
          <Link to="/">
            <img src={logo} alt="car-logo" style={styles.logoImage} />
          </Link>
        </Title>
      </div>

      {/* Search input in the middle */}
      {/* <div style={styles.searchContainer}>
        <Search
          placeholder="Search..."
          enterButton={<SearchOutlined style={styles.searchIcon} />}
          size="large"
          style={styles.searchInput}
        />
      </div> */}

      {/* Buttons on the right */}
      <div style={styles.buttonContainer}>
      {screens.xs && <Button type="text" style={styles.signInButton}>
          <Avatar size="small" icon={<UserOutlined />} style={styles.avatar} />
          Sign In
        </Button>}
        <Button type="primary" style={styles.registerButton}>
          Register Now
        </Button>
      </div>
    </Header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    top: 0,
    backgroundColor: '#2158F5',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  logoImage: {
    height: '40px',
  },
  searchContainer: {
    flex: 1,
    margin: '0 24px',
    maxWidth: '450px',
    justifyContent:'center',
    alignItems:'center'
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
  },
  registerButton: {
    backgroundColor: '#FFC107',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
  },
};

export default AppHeader;