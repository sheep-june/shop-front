import React, { useEffect, useState } from "react";
import axiosInstance, { setCsrfToken } from "../../utils/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import usePageTitle from "../../hooks/usePageTitle";
import { toast } from "react-toastify";

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [selected, setSelected] = useState([]);
    const fetchWishlist = async () => {
        try {
            const res = await axiosInstance.get("/users/wishlist");
            setWishlist(res.data.products);
        } catch (error) {
            console.error("チムリストの読み込みに失敗:", error);
        }
    };
    const user = useSelector((state) => state.user);

    usePageTitle(user?.userData?.name && `${user.userData.name}様の気に入った商品`);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleCheck = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const handleAddToCart = async () => {
        try {
            await setCsrfToken();
            await axiosInstance.post("/users/cart/batch", {
                productIds: selected,
            });
            toast.success("カートに追加されました。");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteWishlist = async () => {
        try {
            await setCsrfToken();
            await axiosInstance.delete("/users/wishlist/batch", {
                data: { productIds: selected },
            });
            toast.success("削除済み");
            setWishlist((prev) =>
                prev.filter((p) => !selected.includes(p._id))
            );
            setSelected([]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                お気に入り商品
            </h2>
            {wishlist.length === 0 ? (
                <p className="text-center text-gray-500">
                    お気に入り商品がありません。
                </p>
            ) : (
                <>
                    <div className="flex gap-2 mb-4 justify-center">
                        <button
                            onClick={handleAddToCart}
                            disabled={selected.length === 0}
                            className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            カートに追加
                        </button>

                        <button
                            onClick={handleDeleteWishlist}
                            disabled={selected.length === 0}
                            className="px-4 py-2 border border-red-500 text-red-500 bg-white rounded hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            削除
                        </button>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {wishlist.map((product) => (
                            <li
                                key={product._id}
                                className="relative border rounded-md shadow"
                            >
                                <input
                                    type="checkbox"
                                    className="absolute top-2 left-2 z-10"
                                    checked={selected.includes(product._id)}
                                    onChange={() => handleCheck(product._id)}
                                />
                                <img
                                    src={`${import.meta.env.VITE_SERVER_URL}/uploads/${product.images[0]}`}
                                    alt={product.title}
                                    className="w-full h-48 object-cover rounded-t"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-1">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-gray-700 mb-1">
                                        ￥{product.price.toLocaleString()}
                                    </p>
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        詳細を見る
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
};

export default WishlistPage;
