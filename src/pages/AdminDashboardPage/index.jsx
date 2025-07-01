import React, { useState } from "react";
import UserSection from "./Sections/UserSection";
import PostSection from "./Sections/PostSection";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
    const [section, setSection] = useState("users");
    const navigate = useNavigate();

    const handleAdminLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <section className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl border-[#00C4C4] text-[#00C4C4]">
                    管理者ダッシュボード
                </h2>
                <button
                    onClick={handleAdminLogout}
                    className="text-sm px-3 py-1 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                >
                    ログアウト
                </button>
            </div>

            <div className="mb-6 space-x-2">
                <button
                    className={`px-4 py-2 rounded transition-colors duration-200 ${
                        section === "users"
                            ? "bg-[#00C4C4] text-white"
                            : "bg-white text-[#00C4C4] border border-[#00C4C4] hover:bg-[#00C4C4] hover:text-white"
                    }`}
                    onClick={() => setSection("users")}
                >
                    全ユーザーを表示
                </button>

                <button
                    className={`px-4 py-2 rounded transition-colors duration-200 ${
                        section === "posts"
                            ? "bg-[#00C4C4] text-white"
                            : "bg-white text-[#00C4C4] border border-[#00C4C4] hover:bg-[#00C4C4] hover:text-white"
                    }`}
                    onClick={() => setSection("posts")}
                >
                    全体の投稿を見る
                </button>

                <Link
                    to="/admin/ads"
                    // to="/admin/ad-image"
                    className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200 inline-block"
                >
                    広告設定
                </Link>

                <Link
                    to="/admin/board"
                    className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200 inline-block"
                >
                    質問掲示板管理
                </Link>

                <Link
                    to="/admin/faq-write"
                    className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200 inline-block"
                >
                    FAQ作成
                </Link>

                <Link
                    to="/board/faq"
                    className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200 inline-block"
                >
                    FAQ掲示板
                </Link>
            </div>

            {section === "users" && <UserSection />}
            {section === "posts" && <PostSection />}
        </section>
    );
};

export default AdminDashboardPage;
