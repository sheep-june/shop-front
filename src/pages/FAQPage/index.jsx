import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../../utils/axios"
import { useSelector } from "react-redux";
import FaqItem from "../../components/Board/FaqItem";
import { toast } from "react-toastify";
import usePageTitle from "../../hooks/usePageTitle";

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [newFaq, setNewFaq] = useState({ title: "", content: "" });
    const user = useSelector((state) => state.user?.userData);
    const isAdmin = user?.role === "admin";
    const fetchFaqs = async () => {
        try {
            const res = await axios.get("/api/faq");
            setFaqs(res.data);
        } catch (err) {
            toast.error("FAQリストを読み込めませんでした。");
        }
    };

    usePageTitle("FAQを確認してください！");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newFaq.title || !newFaq.content)
            return toast.warn("すべての項目を入力してください。");
        try {
            const res = await axios.post("/api/faq", newFaq, {
                withCredentials: true,
            });
            setNewFaq({ title: "", content: "" });
            setFaqs((prev) => [res.data, ...prev]);
            toast.success("FAQ登録完了");
        } catch (err) {
            toast.error("FAQ登録失敗");
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">FAQ</h2>
            {isAdmin && (
                <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                    <input
                        type="text"
                        placeholder="제목"
                        value={newFaq.title}
                        onChange={(e) =>
                            setNewFaq({ ...newFaq, title: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded"
                    />
                    <textarea
                        placeholder="내용"
                        value={newFaq.content}
                        onChange={(e) =>
                            setNewFaq({ ...newFaq, content: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded h-24"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        登録
                    </button>
                </form>
            )}
            {faqs.length === 0 ? (
                <p className="text-gray-500">FAQがありません。</p>
            ) : (
                faqs.map((faq) => (
                    <FaqItem key={faq._id} faq={faq} onUpdate={fetchFaqs} />
                ))
            )}
        </div>
    );
};

export default FAQPage;
