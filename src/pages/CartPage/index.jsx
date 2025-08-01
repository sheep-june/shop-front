import React, { useEffect, useState } from "react";
import axiosInstance, { setCsrfToken } from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../../store/userSlice";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";
import usePageTitle from "../../hooks/usePageTitle";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartDetail = useSelector((state) => state.user.cartDetail);
    const [cartItems, setCartItems] = useState([]);
    const [selected, setSelected] = useState([]);

    usePageTitle("買い物かご");

    useEffect(() => {
        dispatch(fetchUserCart());
    }, [dispatch]);

    useEffect(() => {
        setCartItems(JSON.parse(JSON.stringify(cartDetail)));
    }, [cartDetail]);

    const handleCheck = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const handleQuantity = (productId, type) => {
        const updatedItems = cartItems.map((item) => {
            if (item._id === productId) {
                const newQty =
                    type === "inc"
                        ? item.quantity + 1
                        : Math.max(1, item.quantity - 1);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    const handlePaymentClick = async () => {
        try {
            await setCsrfToken();

            const selectedItems = cartItems
                .filter((item) => selected.includes(item._id))
                .map((item) => ({
                    ...item,
                    totalPrice: item.price * item.quantity,
                }));

            if (!selectedItems.length) {
                toast.warn("決済する商品を選択してください。");
                return;
            }

            await axiosInstance.post("/users/payment", {
                cartDetail: selectedItems,
            });

            toast.success("決済が完了しました。");
            dispatch(fetchUserCart());
            setSelected([]);
        } catch (err) {
            toast.error("決済失敗", err);
            toast.error("決済エラー発生");
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await setCsrfToken();

            if (!selected.length) {
                toast.warn("削除する商品を選択してください。");
                return;
            }

            for (const productId of selected) {
                await axiosInstance.delete("/users/cart", {
                    params: { productId },
                });
            }

            toast.success("選択した商品が削除されました。");
            dispatch(fetchUserCart());
            setSelected([]);
        } catch (err) {
            toast.error("削除失敗", err);
            toast.error("決済エラー発生");
        }
    };

    const totalPrice = cartItems
        ?.filter((item) => selected.includes(item._id))
        ?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

    // 추천 기능 추가 시작
    const [showRec, setShowRec] = useState(false);
    const [budget, setBudget] = useState("");
    const [recommended, setRecommended] = useState([]);
    const [recError, setRecError] = useState("");

    const toggleRec = () => {
        setShowRec((v) => !v);
        setBudget("");
        setRecommended([]);
        setRecError("");
    };

    const knapsack = (items, B) => {
        const n = items.length;
        const dp = Array.from({ length: n + 1 }, () => Array(B + 1).fill(0));
        const keep = Array.from({ length: n + 1 }, () =>
            Array(B + 1).fill(false)
        );

        for (let i = 1; i <= n; i++) {
            const price = items[i - 1].price;
            for (let w = 0; w <= B; w++) {
                if (price <= w) {
                    const take = dp[i - 1][w - price] + price;
                    const leave = dp[i - 1][w];
                    if (take > leave) {
                        dp[i][w] = take;
                        keep[i][w] = true;
                    } else {
                        dp[i][w] = leave;
                    }
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        let w = B;
        const sel = [];
        for (let i = n; i > 0; i--) {
            if (keep[i][w]) {
                sel.push(items[i - 1]);
                w -= items[i - 1].price;
            }
        }
        return sel.reverse();
    };

    const handleRecommend = () => {
        const B = parseInt(budget, 10);
        if (isNaN(B) || B <= 0) {
            setRecError("有効な予算を入力してください。");
            setRecommended([]);
            return;
        }
        const cheapest = Math.min(...cartItems.map((i) => i.price));
        if (B < cheapest) {
            setRecError("予算が足りないんですって？");
            setRecommended([]);
            return;
        }
        // const itemsForDP = cartItems.map((item) => ({
        //     _id: item._id,
        //     title: item.title,
        //     price: item.price,
        // }));
        const itemsForDP = cartItems.map((item) => ({
            _id: item._id,
            title: item.title,
            price: item.price,
            quantity: item.quantity, 
        }));
        const rec = knapsack(itemsForDP, B);
        setRecommended(rec);
        setRecError("");
    };

    const handlePurchase = async () => {
        try {
            await setCsrfToken();
            // const selectedItems = recommended.map((item) => ({
            //     ...item,
            //     totalPrice: item.price,
            // }));
            const selectedItems = recommended.map((item) => ({
                _id: item._id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
            }));
            await axiosInstance.post("/users/payment", {
                cartDetail: selectedItems,
            });
            for (const item of recommended) {
                await axiosInstance.delete("/users/cart", {
                    params: { productId: item._id },
                });
            }
            toast.success("おすすめ商品決済完了");
            dispatch(fetchUserCart());
            toggleRec();
        } catch (err) {
            console.error(err);
            toast.error("おすすめ決済失敗");
        }
    };
    // 추천 기능 추가 끝

    // return (
    //     <section className="max-w-5xl mx-auto p-4">
    //         <h2 className="text-2xl font-semibold text-center mb-6">
    //             나의 장바구니
    //         </h2>

    //         {cartItems?.length === 0 ? (
    //             <p className="text-center text-gray-500">
    //                 장바구니가 비었습니다.
    //             </p>
    //         ) : (
    //             <>
    //                 <table className="w-full text-center border">
    //                     <thead>
    //                         <tr className="bg-gray-100">
    //                             <th></th>
    //                             <th>사진</th>
    //                             <th>개수</th>
    //                             <th>가격</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {cartItems.map((product) => (
    //                             <tr key={product._id} className="border-b">
    //                                 <td>
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={selected.includes(
    //                                             product._id
    //                                         )}
    //                                         onChange={() =>
    //                                             handleCheck(product._id)
    //                                         }
    //                                     />
    //                                 </td>
    //                                 <td className="p-2">
    //                                     <img
    //                                         // src={`http://localhost:4000/uploads/${product.images[0]}`}
    //                                         src={`${
    //                                             import.meta.env.VITE_SERVER_URL
    //                                         }/uploads/${product.images[0]}`}
    //                                         alt={product.title}
    //                                         className="w-20 h-20 object-cover inline-block"
    //                                     />
    //                                     <div>{product.title}</div>
    //                                 </td>
    //                                 <td>
    //                                     <div className="flex items-center justify-center gap-2">
    //                                         <button
    //                                             className="p-1 border border-pink-500 text-pink-500 bg-transparent rounded hover:bg-pink-500 hover:text-white transition-colors duration-200"
    //                                             onClick={() =>
    //                                                 handleQuantity(
    //                                                     product._id,
    //                                                     "dec"
    //                                                 )
    //                                             }
    //                                         >
    //                                             <Minus size={16} />
    //                                         </button>
    //                                         {product.quantity} 개
    //                                         <button
    //                                             className="p-1 border border-[#00C4C4] text-[#00C4C4] bg-transparent rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
    //                                             onClick={() =>
    //                                                 handleQuantity(
    //                                                     product._id,
    //                                                     "inc"
    //                                                 )
    //                                             }
    //                                         >
    //                                             <Plus size={16} />
    //                                         </button>
    //                                     </div>
    //                                 </td>

    //                                 <td>
    //                                     {(
    //                                         product.price * product.quantity
    //                                     ).toLocaleString()}{" "}
    //                                     원
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>

    //                 <div className="flex justify-between mt-6">
    //                     <div className="text-lg font-bold">
    //                         합계: {totalPrice?.toLocaleString() || 0} 원
    //                     </div>
    //                     <div className="flex gap-2">
    //                         <button
    //                             onClick={handleDeleteSelected}
    //                             disabled={selected.length === 0}
    //                             className="border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    //                         >
    //                             삭제
    //                         </button>

    //                         <button
    //                             onClick={handlePaymentClick}
    //                             disabled={selected.length === 0}
    //                             className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    //                         >
    //                             결제하기
    //                         </button>
    //                     </div>
    //                 </div>
    //             </>
    //         )}
    //     </section>
    // );
    return (
        <section className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
                私の買い物かご
            </h2>

            {cartItems?.length === 0 ? (
                <p className="text-center text-gray-500">
                    買い物かごが空です。
                </p>
            ) : (
                <>
                    <table className="w-full text-center border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th></th>
                                <th>写真</th>     
<th>数量</th>     
<th>価格</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((product) => (
                                <tr key={product._id} className="border-b">
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(
                                                product._id
                                            )}
                                            onChange={() =>
                                                handleCheck(product._id)
                                            }
                                        />
                                    </td>
                                    <td className="p-2">
                                        <img
                                            src={`${
                                                import.meta.env.VITE_SERVER_URL
                                            }/uploads/${product.images[0]}`}
                                            alt={product.title}
                                            className="w-20 h-20 object-cover inline-block"
                                        />
                                        <div>{product.title}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="p-1 border border-pink-500 text-pink-500 bg-transparent rounded hover:bg-pink-500 hover:text-white transition-colors duration-200"
                                                onClick={() =>
                                                    handleQuantity(
                                                        product._id,
                                                        "dec"
                                                    )
                                                }
                                            >
                                                <Minus size={16} />
                                            </button>
                                            {product.quantity} 個
                                            <button
                                                className="p-1 border border-[#00C4C4] text-[#00C4C4] bg-transparent rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                                                onClick={() =>
                                                    handleQuantity(
                                                        product._id,
                                                        "inc"
                                                    )
                                                }
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {(
                                            product.price * product.quantity
                                        ).toLocaleString()}{" "}
                                        円
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between mt-6">
                        <div className="text-lg font-bold">
  合計：{totalPrice?.toLocaleString() || 0} 円
</div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDeleteSelected}
                                disabled={selected.length === 0}
                                className="border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                削除
                            </button>
                            <button
                                onClick={handlePaymentClick}
                                disabled={selected.length === 0}
                                className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                決済する
                            </button>
                        </div>
                    </div>

                    {/* 추천 기능 아래에만 추가
                    <div className="mt-10">
                        <button
                            onClick={toggleRec}
                            className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
                        >
                            예산이 부족하시다구요?
                        </button>

                        {showRec && (
                            <div className="mt-4 border p-4 rounded bg-gray-50">
                                <input
                                    type="number"
                                    placeholder="예산 입력 (원)"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full p-2 mb-2 border"
                                />
                                <button
                                    className="px-3 py-2 bg-green-600 text-white rounded mb-2"
                                    onClick={handleRecommend}
                                >
                                    추천받기
                                </button>
                                {recError && (
                                    <p className="text-red-500">{recError}</p>
                                )}
                                {recommended.length > 0 && (
                                    <div>
                                        <ul className="list-disc list-inside mb-2">
                                            {recommended.map((item) => (
                                                <li key={item._id}>
                                                    {item.title} —{" "}
                                                    {item.price.toLocaleString()}
                                                    원
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="font-bold mb-2">
                                            총합:{" "}
                                            {recommended
                                                .reduce(
                                                    (sum, i) => sum + i.price,
                                                    0
                                                )
                                                .toLocaleString()}
                                            원
                                        </p>
                                        <button
                                            className="px-4 py-2 bg-indigo-600 text-white rounded"
                                            onClick={handlePurchase}
                                        >
                                            추천 상품 결제 및 삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div> */}
                    {/* 추천 기능 아래에만 추가 */}
<div className="mt-10">
    <button
        onClick={toggleRec}
        className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] font-semibold rounded-md hover:bg-[#00C4C4] hover:text-white transition duration-200 w-fit"
    >
        予算が足りないんですって？
    </button>

    {showRec && (
        <div className="mt-4 border border-[#00C4C4] bg-white p-6 rounded-xl shadow-md">
            <input
                type="number"
                placeholder="予算入力 (円)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4C4] transition duration-150"
            />

            <button
                className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] font-semibold rounded-md hover:bg-[#00C4C4] hover:text-white transition duration-200 w-fit"
                onClick={handleRecommend}
            >
                おすすめしてもらう
            </button>

            {recError && (
                <p className="text-red-500 text-sm font-medium mt-2">{recError}</p>
            )}

            {recommended.length > 0 && (
                <div className="mt-5">
                    <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
                        {recommended.map((item) => (
                            <li key={item._id}>
                                <span className="font-semibold">{item.title}</span> —{" "}
                                {item.price.toLocaleString()}円
                            </li>
                        ))}
                    </ul>

                    <p className="font-bold text-right text-lg text-gray-700 mb-4">
                        総合:{" "}
                        {recommended.reduce((sum, i) => sum + i.price, 0).toLocaleString()}円
                    </p>

                    <button
                        className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] font-semibold rounded-md hover:bg-[#00C4C4] hover:text-white transition duration-200 w-fit"
                        onClick={handlePurchase}
                    >
                        おすすめ商品の決済及び削除
                    </button>
                </div>
            )}
        </div>
    )}
</div>




                </>
            )}
        </section>
    );
};

export default CartPage;
