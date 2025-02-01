import { FC, useEffect, useState } from 'react';
import { Table, Pagination, Button, Typography, Space } from 'antd';
import { cardData } from '../../Data';
import { formatSaleDate } from '../../utils/helpers/formatdate';

const { Text } = Typography


const VehicleTable: FC<{ carsData: any, filter: any, loading: boolean, handlePageChange: (page: number) => void }> = ({ loading, carsData = [], filter, handlePageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setdataSoruce] = useState<any>(carsData.data || [])
    const pageSize = 10;

    // useEffect(() => {

    // }, [])
    console.log(carsData)

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => (
                <img
                    src={record?.lots?.[0]?.images?.normal?.[0] || "https://via.placeholder.com/150"}
                    alt="vehicle"
                    style={{ width: 100, height: 75 }}
                />
            ),
        },
        {
            title: 'Lot Info',
            dataIndex: 'title',
            key: 'lotInfo',
            render: (title, record) => <Text><a className='blue-text'>{title}</a>
            </Text>,
        },
        {
            title: 'Vehicle Info',
            dataIndex: 'vehicleInfo',
            key: 'vehicleInfo',
            render: (_, record) => <Space direction='vertical'>
                <Text strong >Odometer</Text>
                <Text >{record?.lots?.[0]?.odometer?.km} ({record?.lots?.[0]?.odometer?.status?.name})</Text>
            </Space>,
        },
        {
            title: 'Condition',
            dataIndex: 'condition',
            key: 'condition',
            render: (_, record) => <Space direction='vertical'>
                <Text >{record?.lots?.[0]?.damage?.main?.name}</Text>
                <Text >{record?.lots?.[0]?.damage?.second?.name}</Text>
            </Space>,
            responsive: ['md']
        },
        {
            title: 'Sale Info',
            dataIndex: 'saleInfo',
            key: 'saleInfo',
            render: (_, record) => <Space direction='vertical' >
                <Text >{record?.lots?.[0]?.selling_branch?.name}</Text>
                <Text >ITEM #. {record?.lots?.[0]?.selling_branch?.number}</Text>
                <Text >{formatSaleDate(record?.lots?.[0]?.sale_date)}</Text>
            </Space>,
            responsive: ['md']
        },
        {
            title: 'Bids',
            dataIndex: 'bids',
            key: 'bids',
            render: (_, record) => {
                return (<>
                    <Space direction='vertical' >
                        {filter?.buyItNow ? <><Text>Current Bid ${record?.lots?.[0]?.bid} USD</Text>
                            <Button type="primary" className='join-auction-btn'>JOIN AUCTIONS</Button></> :
                            <>
                                <Text>Current Bid ${record?.lots?.[0]?.bid} USD</Text>
                                <Button type="primary" className='bid-now-btn'>BID NOW</Button>
                                <Text> ${record?.lots?.[0]?.bid} USD</Text>
                                <Button type="primary" className='join-auction-btn'>BUY IT NOW</Button>
                            </>}
                    </Space>
                </>
                )
            }
        }
    ]

    const handleChange = (page: number) => {
        setCurrentPage(page);
        handlePageChange(page)
    };
    console.log(loading)
    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                bordered
                loading={loading}
            />
            {/* <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={dataSource.length}
                onChange={handleChange}
            /> */}
        </div>
    );
};

export default VehicleTable;