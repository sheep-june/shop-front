import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionItem from "../../components/Board/QuestionItem";
import { toast } from "react-toastify";
import axiosInstance, { setCsrfToken } from "../../utils/axios";
import usePageTitle from "./../../hooks/usePageTitle";

const QuestionPage = () => {
    const user = useSelector((state) => state.user?.userData);
    const [questions, setQuestions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });
    const fetchQuestions = async () => {
        try {
            const res = await axiosInstance.get("/api/question");
            setQuestions(res.data);
        } catch (err) {
            toast.error("質問リストを読み込めません。");
        }
    };
    usePageTitle("質問を作成してください！");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setCsrfToken();
        await new Promise((r) => setTimeout(r, 100));
        if (!newQuestion.title || !newQuestion.content) {
            return toast.warn("タイトルと内容をすべて入力してください。");
        }
        try {
            const res = await axiosInstance.post("/api/question", newQuestion);
            toast.success("質問が登録されました。");
            setNewQuestion({ title: "", content: "" });
            setShowForm(false);
            setQuestions((prev) => [res.data, ...prev]);
        } catch (err) {
            toast.error("質問の登録に失敗しました。");
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">질문게시판</h2>

            {/* ✅ 일반 유저(0)만 작성 가능 */}
            {user?.role === 0 && (
                <>
                    <button
                        onClick={() => setShowForm((prev) => !prev)}
                        className="mb-4 px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                    >
                        {showForm ? "作成閉じる" : "質問作成"}
                    </button>

                    {showForm && (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-2 mb-6"
                        >
                            <input
                                type="text"
                                placeholder="題目"
                                value={newQuestion.title}
                                onChange={(e) =>
                                    setNewQuestion({
                                        ...newQuestion,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00C4C4]"
                            />

                            <textarea
                                placeholder="内容"
                                value={newQuestion.content}
                                onChange={(e) =>
                                    setNewQuestion({
                                        ...newQuestion,
                                        content: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 px-3 py-2 rounded h-32 focus:outline-none focus:ring-2 focus:ring-[#00C4C4]"
                            />

                            <button
                                type="submit"
                                className="px-4 py-2 border border-[#00C4C4] text-[#00C4C4] bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                            >
                                登録する
                            </button>
                        </form>
                    )}
                </>
            )}
            {questions.length === 0 ? (
                <p className="text-gray-500">登録された質問がありません。</p>
            ) : (
                questions.map((q) => <QuestionItem key={q._id} question={q} />)
            )}
        </div>
    );
};

export default QuestionPage;
