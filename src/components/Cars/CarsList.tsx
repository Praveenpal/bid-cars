import React from 'react';
import { Card, Row, Col, Typography, Button, Image, Spin } from 'antd';
import { Car } from '../../types/interfaces';
import { formatSaleDate } from '../../utils/helpers/formatdate';

const {  Text } = Typography;

interface CarListProps {
    cars: Car[];
    loading: boolean
}

const CarList: React.FC<CarListProps> = ({ cars, loading }) => {
    return (
        <>
            {loading ? <div className='heading-md loader'>  <Spin size="large" /></div>
                :
                <Row gutter={[16, 16]}>

                    {cars.map((car) => {
                        // Use optional chaining and nullish coalescing to handle null/undefined values
                        const lot = car.lots?.[0] ?? {}; // Fallback to an empty object if lots is null/undefined
                    
                        const titleName = lot?.title?.name ?? "N/A";
                        // const location = lot.location. ?? 'Location Not Available';
                        const odometer = lot.odometer.km?.toLocaleString() ?? 'N/A';
                        const saleDate = formatSaleDate(lot.sale_date) ?? 'Sale Date Not Available';
                        const bidPrice = lot.bid?.toLocaleString() ?? '250';
                        const buyItNowPrice = lot.buy_now?.toLocaleString() ?? '110';

                        return (
                            <Col key={car.id} xs={24}>
                                <Card
                                // title={`${car.year} ${manufacturerName} ${modelName}`}
                                // extra={<Text strong>{lotNumber}</Text>}
                                >
                                    <Row gutter={20}>
                                        <Col xs={8}>
                                            <Image src={lot?.images?.normal?.[0] || "https://via.placeholder.com/150"} />
                                        </Col>
                                        <Col xs={16}>
                                            <Text className='blue-text'>
                                                <strong>{car.title ?? 'N/A'}</strong>
                                            </Text>
                                            <br />
                                            <br />
                                            <Text type='secondary'>
                                                Lot #: {lot.lot}
                                            </Text>
                                            <br />
                                            <Text type='secondary'>
                                                {titleName}
                                            </Text>
                                            <br />
                                            <Text type='secondary'>
                                                Odometer: {odometer} miles
                                            </Text>
                                            <br />
                                            <Text type='secondary'>
                                                Sale Date: {saleDate}
                                            </Text>
                                            <br />
                                        </Col>
                                    </Row>
                                    <Col xs={24} className='carslist-btns'>
                                        <Col xs={12}>
                                            <Button block className='carslist-btn-details'>
                                                Bid Now $ {bidPrice}
                                            </Button>
                                        </Col>
                                        <Col xs={12}>
                                            <Button block className='carslist-btn-bid' >
                                                Buy It Now ${buyItNowPrice}
                                            </Button></Col>
                                    </Col>
                                </Card>
                            </Col>)
                    })}

                </Row>}
        </>
    );
};

export default CarList;