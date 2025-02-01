import { Pagination } from "antd";
import { FC } from "react";

interface ILinks {
    url: string
    label: string | number
    active: boolean
}

const CustomPagination: FC<{ paginationData: any, onPageChange: (page: number) => void }> = ({ paginationData, onPageChange }) => {
    if (!paginationData) return null;

    const { current_page, total, per_page, links=[] } = paginationData;

    // Extract page numbers from links
    const pageNumbers = links?.filter((link: ILinks) => !isNaN(link.label))?.map((link: ILinks) => ({
            label: link.label,
            page: new URL(link?.url)?.searchParams?.get("page") || null,
            active: link.active
        }));

    return (
        <Pagination
            current={current_page}
            total={total}
            pageSize={per_page}
            showSizeChanger={false}
            onChange={onPageChange}
            itemRender={(page, type) => {
                if (type === "prev") {
                    return links[0]?.url ? <a>« Previous</a> : null;
                }
                if (type === "next") {
                    return links[links?.length - 1]?.url ? <a>Next »</a> : null;
                }
                if (type === "page") {
                    const activePage = pageNumbers?.find((p: ILinks) => p?.label === page?.toString());
                    return activePage ? (
                        <a style={activePage?.active ? { fontWeight: "bold" } : {}}>
                            {page}
                        </a>
                    ) : (
                        <span>...</span>
                    );
                }
                return null;
            }}
        />
    );
};

export default CustomPagination;
