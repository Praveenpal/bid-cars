import { useEffect, useState } from 'react';
import { Typography, Switch, Layout, Menu, Button, Pagination } from 'antd';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import "./style/search.css"
import SearchResult from './SearchResult';
import { apiCall } from '../../utils/api/API';
import VehicleTable from './SearchResults';
import { cardData } from '../../Data';

const { Title } = Typography

const { Sider } = Layout;

const Search = () => {
  const [filters, setFilters] = useState({
    selectVehiclesOnly: false,
    buyItNow: false,
    cleanTitles: false,
    excludeUpcomingAuctionVehicles: false,
  });
  const [data, setData] = useState([])
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(data)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  useEffect(() => {
    fetchCars(currentPage, filters)
  }, []);

  const fetchCars = async (page = 1, updatedFilters: any) => {
    // let filterQuery = `page=${page}`
    // if (filters.buyItNow) {
    //   filterQuery = `buy_now/${page}`
    // }
    setLoading(true)
    const url = `https://cars.asicompany.com/api/cars`
    try {
      const response = await apiCall("GET", url, { ...updatedFilters.buyItNow ? { buy_now: true } : {}, page: page });
      // setData(response);
    } catch (error) {
      console.error("Error fetching cars", error);
    }
    setTimeout(() => setData(cardData), 2000)
    setLoading(false)
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchCars(page, filters)
  }

  const handleFilterChange = (filterName: string, checked: boolean) => {
    setFilters({
      ...filters,
      [filterName]: checked,
    });

    // Call your API here with the updated filters
    callApiWithFilters({
      ...filters,
      [filterName]: checked,
    });
  };

  const callApiWithFilters = (updatedFilters: any) => {
    // Replace this with your actual API call logic
    fetchCars(currentPage, updatedFilters);
    console.log('Calling API with filters:', updatedFilters);
  };




  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {/* <Sider
        width={220} theme="light"
        // hidden={collapsed}
        // collapsible
        // collapsed={collapsed}
        collapsedWidth={0}
        // onCollapse={(value) => setCollapsed(value)}
        breakpoint="md" // Collapse sidebar at medium screen size
        // onBreakpoint={(broken) => {
        //   setIsMobile(broken); // Update mobile state
        //   if (broken) setCollapsed(true); // Automatically collapse sidebar on mobile
        // }}
        trigger={null}
      > */}
        <Menu mode="inline" defaultSelectedKeys={['1']} className='filter-menu' >
          <Menu.ItemGroup>
            <Menu.Item key="1">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Search Filters</span>
                <Switch
                  size='small'
                  checked={filters.selectVehiclesOnly}
                  onChange={(checked) => handleFilterChange('selectVehiclesOnly', checked)}
                />
              </div>
            </Menu.Item>
            <Menu.Item key="2">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Buy It Now</span>
                <Switch
                  size='small'
                  checked={filters.buyItNow}
                  onChange={(checked) => handleFilterChange('buyItNow', checked)}
                />
              </div>
            </Menu.Item>
            <Menu.Item key="3">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Clean Titles</span>
                <Switch
                  size='small'
                  checked={filters.cleanTitles}
                  onChange={(checked) => handleFilterChange('cleanTitles', checked)}
                />
              </div>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      {/* Header with Burger Icon */}
      {isMobile && <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />}
      <Layout style={{ padding: '0px 10px' }}>
        {/* <SearchResult carsData={data} fetchCars={fetchCars} /> */}
        <Title level={2} > Discover Your Right Car</Title>
        <VehicleTable carsData={data} filter={filters} loading={loading} handlePageChange={handlePageChange} />
        <Pagination
          className="custom-pagination"
          current={currentPage}
          pageSize={data?.meta?.per_page}
          total={data?.meta?.total}
          onChange={handlePageChange}
          showSizeChanger={false} 
        />
      </Layout>
    </Layout>
  );
};

export default Search;