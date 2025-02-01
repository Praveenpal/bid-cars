import { Col, Pagination, Row, Table, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import CustomPagination from "../../components/Table/CustomPagination";

const { Text } = Typography

const SearchResult: FC<{ carsData: any, fetchCars: (page: number) => void }> = ({ carsData = {}, fetchCars }) => {
    console.log(carsData)

    const { current_page, per_page, total, from, to, last_page } = carsData;

    const [searchText, setSearchText] = useState('');
    const [paginationData, setPaginationData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // Define columns for the table

    useEffect(() => {
        setPaginationData(carsData)
    }, [carsData])

    useEffect(() => {
        fetchCars(currentPage);
    }, [currentPage]);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            render: (text: string) => <img src={text} alt="item" style={{ width: 100 }} />,
        },
        {
            title: 'Lot Info',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        // {
        //   title: 'Price',
        //   dataIndex: 'price',
        // },
    ];

    return (
        <>
            <Row gutter={[10, 20]}>
                <Text style={{ fontSize: "16px" }}>
                    Showing {from} – {to} of {total} Listings
                </Text>
            </Row>
            <br />
            <Table
                columns={columns}
                dataSource={carsData?.data}
                //  expandable={{
                //     expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                //     rowExpandable: (record) => record.name !== 'Not Expandable',
                //   }}
                pagination={false} />
            <Pagination
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={carsData.length}
                pageSize={3}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
            {/* <CustomPagination
                paginationData={paginationData}
                onPageChange={(page: number) => setCurrentPage(page)}
            /> */}
        </>
    )
}

export default SearchResult