import { FC, useEffect, useState } from 'react';
import { Table, Button, Typography, Space, Row } from 'antd';
import { formatSaleDate } from '../../utils/helpers/formatdate';
import { Car, CarApiResponse } from '../../types/interfaces';
import { initialCarApiResponse } from './Search';

const { Text } = Typography


const VehicleTable: FC<{ carsData: CarApiResponse, filter: any, loading: boolean, handlePageChange: (page: number) => void }> = ({ loading, carsData = initialCarApiResponse, filter }) => {
    const [dataSource, setdataSoruce] = useState<any>([])
    const { from, to, total } = carsData?.meta

    useEffect(() => {
        setdataSoruce(carsData.data || [])
    }, [carsData])

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_:any, record: Car) => (
                <img
                    src={record?.lots?.[0]?.images?.normal?.[0] || "https://via.placeholder.com/150"}
                    alt="vehicle"
                    style={{ width: 100, height: 75 }}
                />
            ),
            responsive: ["xs", "sm", "md", "lg", "xl", "xxl"], //
        },
        {
            title: 'Lot Info',
            dataIndex: 'title',
            key: 'lotInfo',
            render: (title: any) => <Text><a className='blue-text'>{title}</a>
            </Text>,
            responsive: ["xs", "sm", "md", "lg", "xl", "xxl"], //
        },
        {
            title: 'Vehicle Info',
            dataIndex: 'vehicleInfo',
            key: 'vehicleInfo',
            render: (_: any, record: Car) => <Space direction='vertical'>
                <Text strong >Odometer</Text>
                <Text >{record?.lots?.[0]?.odometer?.km} ({record?.lots?.[0]?.odometer?.status?.name})</Text>
            </Space>,
            responsive: ["xs", "sm", "md", "lg", "xl", "xxl"], //
        },
        {
            title: 'Condition',
            dataIndex: 'condition',
            key: 'condition',
            render: (_: any, record: Car) => <Space direction='vertical'>
                <Text >{record?.lots?.[0]?.damage?.main?.name}</Text>
                <Text >{record?.lots?.[0]?.damage?.second?.name}</Text>
            </Space>,
            responsive: ["md"]
        },
        {
            title: 'Sale Info',
            dataIndex: 'saleInfo',
            key: 'saleInfo',
            render: (_: any, record: Car) => <Space direction='vertical' >
                <Text >{record?.lots?.[0]?.selling_branch?.name}</Text>
                <Text >ITEM #. {record?.lots?.[0]?.selling_branch?.number}</Text>
                <Text >{formatSaleDate(record?.lots?.[0]?.sale_date)}</Text>
            </Space>,
            responsive: ["md"]
        },
        {
            title: 'Bids',
            dataIndex: 'bids',
            key: 'bids',
            render: (_: any, record: Car) => {
                return (<>
                    <Space direction='vertical' >
                        {filter?.buyItNow ?
                            <>
                                <Text>Current Bid ${record?.lots?.[0]?.bid} USD</Text>
                                <Button type="primary" className='bid-now-btn'>BID NOW</Button>
                                <Text> ${record?.lots?.[0]?.bid} USD</Text>
                                <Button type="primary" className='join-auction-btn'>BUY IT NOW</Button>
                            </> : <>
                                <Text>Current Bid ${record?.lots?.[0]?.bid} USD</Text>
                                <Button type="primary" className='join-auction-btn'>JOIN AUCTIONS</Button></>
                        }
                    </Space>
                </>
                )
            },
            responsive: ["xs", "sm", "md", "lg", "xl", "xxl"], //
        }
    ]

    return (
        <div>
            <Row gutter={[10, 20]}>
                <Text type='secondary'>
                    Showing {from} – {to} of {total} Listings
                </Text>
            </Row>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                bordered
                loading={loading}
            />
        </div>
    );
};

export default VehicleTable;