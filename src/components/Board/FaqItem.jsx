import { useState } from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { useConfirmAlert } from "../../hooks/useConfirmAlert";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

const FaqItem = ({ faq, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: faq.title,
        content: faq.content,
    });


    const isAdmin = !!localStorage.getItem("adminToken");
    const token = localStorage.getItem("adminToken");
    const csrfToken = getCookie("XSRF-TOKEN");
    const { confirm } = useConfirmAlert();

    // const handleDelete = async () => {
    //     if (!window.confirm("本当に削除しますか")) return;
    //     try {
    //         await axios.delete(`/api/faq/${faq._id}`, {
    //             withCredentials: true,
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "x-xsrf-token": csrfToken,
    //             },
    //         });
    //         toast.success("削除済み");
    //         onUpdate();
    //     } catch (err) {
    //         toast.error("削除失敗");
    //     }
    // };
    const handleDelete = async () => {
        const isConfirmed = await confirm({
            title: "削除確認",
            text: "本当に削除しますか？",
            confirmText: "削除",
            cancelText: "キャンセル",
        });

        if (!isConfirmed) return;

        try {
            await axios.delete(`/api/faq/${faq._id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-xsrf-token": csrfToken,
                },
            });
            toast.success("削除済み");
            onUpdate(); // FAQ 목록 다시 불러오기 등
        } catch (err) {
            toast.error("削除失敗");
        }
    };

    const handleUpdate = async () => {
        if (!editData.title || !editData.content) {
            return toast.warn("タイトルと内容の両方を入力してください。");
        }
        try {
            await axios.put(`/api/faq/${faq._id}`, editData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-xsrf-token": csrfToken,
                },
            });
            toast.success("修正完了");
            setIsEditing(false);
            onUpdate();
        } catch (err) {
            toast.error("修正失敗");
        }
    };

    return (
        <div className="border rounded mb-3 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium"
            >
                {faq.title}
            </button>

            {open && (
                <div className="px-4 py-3 bg-white text-sm text-gray-700 border-t">
                    {isEditing ? (
                        <>
                            <input
                                className="w-full border px-2 py-1 mb-2 rounded"
                                value={editData.title}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <textarea
                                className="w-full border px-2 py-1 rounded mb-2"
                                value={editData.content}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        content: e.target.value,
                                    })
                                }
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={handleUpdate}
                                    className="px-3 py-1 bg-white text-[#00C4C4] border border-[#00C4C4] rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                                >
                                    登録
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-3 py-1 bg-white text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                                >
                                    キャンセル
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="whitespace-pre-line">{faq.content}</p>
                            <p className="mt-2 text-xs text-right text-gray-400">
                                {`作成者: ${faq.admin?.name || "管理者"} / ${dayjs(
                  faq.createdAt
                ).format("YYYY年MM月DD日 HH時mm分ss秒")}`}
                            </p>

                            {isAdmin && (
                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-3 py-1 bg-white text-[#00C4C4] border border-[#00C4C4] rounded hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                                    >
                                        修整
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-3 py-1 bg-white text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                                    >
                                        削除
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FaqItem;
