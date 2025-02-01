import { useEffect, useState } from 'react';
import { Typography, Switch, Layout, Menu, Button, Pagination, Grid, Drawer } from 'antd';

import { FilterOutlined } from '@ant-design/icons';
import "./style/search.css"
import { apiCall } from '../../utils/api/API';
import VehicleTable from './SearchResults';
import { CarApiResponse } from '../../types/interfaces';

const { Title } = Typography

const { Sider } = Layout;


const { useBreakpoint } = Grid;

export const initialCarApiResponse: CarApiResponse = {
  data: [],
  links: {
    first: "",
    last: "",
    prev: null,
    next: "",
  },
  meta: {
    current_page: 1,
    from: 0,
    last_page: 1,
    links: [],
    path: "",
    per_page: 0,
    to: 0,
    total: 0,
  },
};


const Search = () => {
  const [filters, setFilters] = useState({
    selectVehiclesOnly: false,
    buyItNow: false,
    cleanTitles: false,
    excludeUpcomingAuctionVehicles: false,
  });
  const [data, setData] = useState<CarApiResponse>(initialCarApiResponse)
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const screens = useBreakpoint(); // 

  useEffect(() => {
    fetchCars(currentPage, filters)
  }, []);

  const fetchCars = async (page = 1, updatedFilters: any) => {
    let filterQuery = `page=${page}`
    if (updatedFilters.buyItNow) {
      filterQuery = `buy_now=1&page=${page}`
    }
    setLoading(true)
    const url = `https://cars.asicompany.com/api/cars?${filterQuery}`
    try {
      const response = await apiCall("GET", url);
      setData(response);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching cars", error);
    }
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
  };


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>

        {/* Sidebar for Larger Screens */}
        <Sider
          className='slider-filter'
          theme="light"
          breakpoint="md"
          hidden={collapsed}
          onCollapse={(collapsed) => {
            setCollapsed(collapsed);
          }}
        >

          <Menu mode="inline"  className='filter-menu' >
            <Menu.ItemGroup>
              <Menu.Item key="1">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3><strong>Search Filters</strong></h3>
                  {/* <Switch
                    size='small'
                    checked={filters.selectVehiclesOnly}
                    onChange={(checked) => handleFilterChange('selectVehiclesOnly', checked)}
                  /> */}
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
              {/* <Menu.Item key="3">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Clean Titles</span>
                  <Switch
                    size='small'
                    checked={filters.cleanTitles}
                    onChange={(checked) => handleFilterChange('cleanTitles', checked)}
                  />
                </div>
              </Menu.Item> */}
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        {/* Drawer for Mobile Screens */}
        <Drawer
          title="Filters"
          placement="left"
          onClose={onClose}
          visible={visible}
          width={300}
        >
          <Menu mode="inline" defaultSelectedKeys={['1']} className="filter-menu">
            <Menu.ItemGroup >
              <Menu.Item key="1">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Search Filters</span>
                  {/* <Switch
                    size="small"
                    checked={filters.selectVehiclesOnly}
                    onChange={(checked) => handleFilterChange('selectVehiclesOnly', checked)}
                  /> */}
                </div>
              </Menu.Item>
              <Menu.Item key="2">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Buy It Now</span>
                  <Switch
                    size="small"
                    checked={filters.buyItNow}
                    onChange={(checked) => handleFilterChange('buyItNow', checked)}
                  />
                </div>
              </Menu.Item>
              <Menu.Item key="3">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Clean Titles</span>
                  <Switch
                    size="small"
                    checked={filters.cleanTitles}
                    onChange={(checked) => handleFilterChange('cleanTitles', checked)}
                  />
                </div>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Drawer>
        {/* Header with Burger Icon */}

        <Layout style={{
          padding: '0px 10px',
          width: '100%',
          flexGrow: '1'
        }} >

          {!screens.md && <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={showDrawer}
            style={{ margin: '16px' }}
            id="filter-button"
          >Filter</Button>}

          {filters.buyItNow ?
            < Title level={2} > Search Results: Buy it now</Title>
            : < Title level={2} > Discover Your Right Car</Title>}

          <VehicleTable carsData={data} filter={filters} loading={loading} handlePageChange={handlePageChange} />
          <Pagination
            className="custom-pagination"
            current={currentPage}
            pageSize={data?.meta?.per_page}
            total={data?.meta?.total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
          <br />
        </Layout>
      </Layout >
    </>
  );
};

export default Search;