import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import CommentBox from "../../../components/Board/CommentBox";
import { toast } from "react-toastify";
import { useConfirmAlert } from "../../../hooks/useConfirmAlert";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

const BoardSection = () => {
    const [questions, setQuestions] = useState([]);
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [isEditingCommentId, setIsEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const { confirm } = useConfirmAlert();

    const fetchQuestions = async () => {
        try {
            const res = await axios.get("/api/question");
            setQuestions(res.data);
        } catch (err) {
            toast.error("質問リストを読み込めませんでした。");
        }
    };

    const handleOpenComment = (id) => {
        setActiveCommentId((prev) => (prev === id ? null : id));
    };

    const startEdit = (commentId, currentContent) => {
        setIsEditingCommentId(commentId);
        setEditContent(currentContent);
    };

    const cancelEdit = () => {
        setIsEditingCommentId(null);
        setEditContent("");
    };

    const saveEdit = async (commentId) => {
        try {
            await axios.put(
                `/api/question/reply/${commentId}`,
                { content: editContent },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                        "x-xsrf-token": getCookie("XSRF-TOKEN"),
                    },
                }
            );
            toast.success("回答修正完了");
            setIsEditingCommentId(null);
            setEditContent("");
            fetchQuestions();
        } catch (err) {
            toast.error("回答修正失敗");
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
                質問掲示板管理
            </h2>

            {questions.length === 0 ? (
                <p className="text-gray-500">質問がありません。</p>
            ) : (
                <div className="space-y-4">
                    {questions.map((q) => (
                        <div
                            key={q._id}
                            className="border rounded p-4 bg-white shadow-sm relative"
                        >
                            <h3 className="font-semibold text-lg">{q.title}</h3>
                            <p className="text-gray-700 mt-2 whitespace-pre-line">
                                {q.content}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                作成者: {q.user?.name || "ユーザー"} /{" "}
                                {new Date(q.createdAt).toLocaleString()}
                            </p>

                            {q.comment ? (
                                <div className="mt-4 bg-gray-50 p-3 rounded text-sm">
                                    <p className="font-medium">答弁</p>
                                    {isEditingCommentId === q.comment._id ? (
                                        <>
                                            <textarea
                                                value={editContent}
                                                onChange={(e) =>
                                                    setEditContent(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border rounded text-sm"
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button
                                                    onClick={cancelEdit}
                                                    className="px-3 py-1 border text-gray-500 border-gray-500 rounded hover:bg-gray-100 text-sm"
                                                >
                                                    キャンセル
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        saveEdit(q.comment._id)
                                                    }
                                                    className="px-3 py-1 border text-yellow-500 border-yellow-500 rounded hover:bg-yellow-500 hover:text-white text-sm"
                                                >
                                                    保存
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="mt-1">
                                                {q.comment.content}
                                            </p>
                                            <p className="text-xs text-gray-400 text-right mt-2">
                                                {q.comment.admin?.name} /{" "}
                                                {new Date(
                                                    q.comment.createdAt
                                                ).toLocaleString()}
                                            </p>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() =>
                                            handleOpenComment(q._id)
                                        }
                                        className="mt-3 px-3 py-1 border border-[#00C4C4] text-[#00C4C4] text-sm bg-white rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                                    >
                                        {activeCommentId === q._id
                                            ? "閉じる"
                                            : "答弁作成"}
                                    </button>

                                    {activeCommentId === q._id && (
                                        <div className="mt-2">
                                            <CommentBox
                                                questionId={q._id}
                                                onFinish={() => {
                                                    setActiveCommentId(null);
                                                    fetchQuestions();
                                                }}
                                                onClose={() =>
                                                    setActiveCommentId(null)
                                                }
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="flex justify-end gap-2 mt-3">

                                <button
    onClick={async () => {
        const isConfirmed = await confirm({
            title: "質問削除",
            text: "この質問を本当に削除しますか",
            confirmText: "削除",
            cancelText: "キャンセル",
        });

        if (!isConfirmed) return;

        try {
            await axios.delete(`/api/question/${q._id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    "x-xsrf-token": getCookie("XSRF-TOKEN"),
                },
            });
            toast.success("質問削除済み");
            fetchQuestions();
        } catch (err) {
            toast.error("質問削除失敗");
        }
    }}
    className="px-3 py-1 border border-red-500 text-red-500 bg-white text-sm rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
>
    質問削除
</button>


                                {q.comment && isEditingCommentId !== q.comment._id && (
                                    <>
                                        <button
                                            onClick={() =>
                                                startEdit(
                                                    q.comment._id,
                                                    q.comment.content
                                                )
                                            }
                                            className="px-3 py-1 border border-yellow-500 text-yellow-500 text-sm rounded bg-white hover:bg-yellow-500 hover:text-white transition-colors duration-200"
                                        >
                                            答弁修正
                                        </button>


                                        <button
    onClick={async () => {
        const isConfirmed = await confirm({
            title: "回答削除",
            text: "この回答を本当に削除しますか",
            confirmText: "削除",
            cancelText: "キャンセル",
        });

        if (!isConfirmed) return;

        try {
            await axios.delete(`/api/question/reply/${q.comment._id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    "x-xsrf-token": getCookie("XSRF-TOKEN"),
                },
            });
            toast.success("回答削除済み");
            fetchQuestions();
        } catch (err) {
            toast.error("回答削除失敗");
        }
    }}
    className="px-3 py-1 border border-gray-500 text-gray-500 text-sm rounded bg-white hover:bg-gray-500 hover:text-white transition-colors duration-200"
>
    回答削除
</button>

                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoardSection;
