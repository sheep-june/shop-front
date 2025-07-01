import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import usePageTitle from "../../hooks/usePageTitle";

const ITEMS_PER_PAGE = 20;

const HistoryPage = () => {
    const userData = useSelector((state) => state.user?.userData);
    const sortedHistory = [...(userData?.history || [])].sort(
        (a, b) => new Date(b.dateOfPurchase) - new Date(a.dateOfPurchase)
    );
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sortedHistory.length / ITEMS_PER_PAGE);
    const paginated = sortedHistory.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    usePageTitle("注文内訳");

    return (
        <section>
            <div className="text-center m-7">
                <h2 className="text-2xl">注文内訳</h2>
            </div>

            <table className="w-full text-sm text-left text-gray-500">
                <thead className="border-[1px]">
                    <tr>
                        <th className="w-1/4">商品名</th>    
<th className="w-1/4">数量</th>     
<th className="w-1/4">価格</th>    
<th className="w-1/4">購入日</th>    
                    </tr>
                </thead>

                <tbody>
                    {paginated.map((item, index) => (
                        <tr className="border-b" key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            {/* <td>{item.price.toLocaleString()}원</td> */}
                            <td>
                                {(
                                    item.price ??
                                    item.totalPrice ??
                                    0
                                ).toLocaleString()}
                                円
                            </td>
                            <td>
                                {dayjs(item.dateOfPurchase).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-4 space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded 
        ${
            currentPage === i + 1
                ? "bg-[#00C4C4] text-white border-[#00C4C4]"
                : "bg-white text-[#00C4C4] border-[#00C4C4] hover:bg-[#00C4C4] hover:text-white"
        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default HistoryPage;
