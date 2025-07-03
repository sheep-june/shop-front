import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/thunkFunctions";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleCartClick = () => {
        if (!user.isAuth) {
            toast.warn("ログインしてください");
            setTimeout(() => {
                navigate("/auth");
            }, 2000); // 1초 정도 후 이동
            return;
        }
        dispatch(addToCart({ productId: product._id }));
    };

    const handleWishlistClick = async () => {
        if (!user.isAuth) {
            toast.warn("ログインしてください");
            setTimeout(() => {
                navigate("/auth");
            }, 2000);
            return;
        }

        try {
            const res = await axiosInstance.post("/users/wishlist", {
                productId: product._id,
            });
            toast.success("お気に入りリストに追加されました。");
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("お気に入りに失敗しました。");
            }
        }
    };

    return (
        <div>
            <p className="text-xl text-bold">商品情報</p>
            <ul>
                <li>
                    <span className="font-semibold text-gray-900">価格:</span>{" "}
                    {product.price.toLocaleString()} 円
                </li>
                <li>
                    <span className="font-semibold text-gray-900">
                        売られた個数:
                    </span>{" "}
                    {product.sold} 個
                </li>
            </ul>
            <div className="mt-3 flex space-x-2">
                <button
                    onClick={handleCartClick}
                    className="w-1/2 px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded-md hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                >
                    カートに入れる
                </button>
                <button
                    onClick={handleWishlistClick}
                    className="w-1/2 px-4 py-2 border border-pink-500 text-pink-500 bg-white rounded-md hover:bg-pink-500 hover:text-white transition-colors duration-200"
                >
                    お気に入り
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
