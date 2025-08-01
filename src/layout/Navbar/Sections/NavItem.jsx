import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { setCsrfToken } from "../../../utils/axios";
import { isProtectedPath } from "../../../utils/protectedPaths";
import { toast } from "react-toastify";


const NavItem = ({ mobile }) => {
    const isAuth = useSelector((state) => state.user?.isAuth);
    const userData = useSelector((state) => state.user?.userData);
    const cart = userData?.cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await setCsrfToken();
            await dispatch(logoutUser());

            const path = location.pathname;
            if (isProtectedPath(path)) {
                navigate("/");
            }
        } catch (err) {
            toast.error("ログアウト失敗:", err);
        }
    };

    if (!isAuth) {
        return (
            <ul
                className={`text-md w-full flex gap-4 ${
                    mobile ? "flex-col bg-gray-900" : ""
                } items-center justify-center`}
            >
                <li>
                    <Link to="/auth">ログイン</Link>
                </li>
                <li>
                    <Link to="/auth?mode=register">会員登録</Link>
                </li>
            </ul>
        );
    }

    return (
        <ul
            className={`text-md w-full flex gap-4 ${
                mobile ? "flex-col bg-gray-900" : ""
            } items-center justify-center`}
        >
            {/* ✅ 이름 출력 */}
            {userData?.name && (
                <li className="text-sm text-gray-700">
                    <span className="text-[#00C4C4] font-semibold">
                        {userData.name}
                    </span>
                    さん
                </li>
            )}

            <li className="relative">
                <Link to="/user/cart">
                    <AiOutlineShoppingCart className="text-xl" />
                    <span className="absolute top-0 -right-2 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                        {cart?.length}
                    </span>
                </Link>
            </li>

            {/* ✅ 게시판 버튼 추가 위치 */}
            <li>
                <Link
                    to="/board"
                    className="text-sm px-4 py-2 text-[#00C4C4] hover:underline"
                >
                    掲示板
                </Link>
            </li>

            <li
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <div className="text-xl text-[#00C4C4] flex items-center gap-1 cursor-default">
                    <AiOutlineUser />
                </div>

                {dropdownOpen && (
                    // <ul className="absolute top-full right-0 z-20 w-40 py-2 bg-white border rounded shadow-lg text-black text-sm">
                    <ul className="absolute top-full left-1/2 -translate-x-1/2 z-20 w-40 py-2 bg-white border rounded shadow-lg text-black text-sm">
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <Link to="/history">注文内訳</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <Link to="/product/upload">アップロード</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <Link to="/user/myproducts">あげた商品</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                            <Link to="/user/wishlist">お気に入りリスト</Link>
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleLogout}
                        >
                            ログアウト
                        </li>
                    </ul>
                )}
            </li>
        </ul>
    );
};

export default NavItem;
