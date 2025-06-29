import React, { useEffect, useState } from "react";
import axiosInstance, { setCsrfToken } from "../../utils/axios";
import { toast } from "react-toastify";
import { useConfirmAlert } from "../../hooks/useConfirmAlert";

const PRODUCT_API_PATH = "/products";

export default function AdminAdImagePage() {
    const [products, setProducts] = useState([]);
    const [ads, setAds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");


const { confirm } = useConfirmAlert();

    // ① 페이지 로드 시: CSRF → 상품 목록 → 광고 목록
    useEffect(() => {
        (async () => {
            await setCsrfToken();
            await fetchProducts();
            await fetchAds();
        })();
    }, []);

    // 상품 목록 가져오기
    const fetchProducts = async () => {
        try {
            const res = await axiosInstance.get(PRODUCT_API_PATH);
            setProducts(res.data.products || []);
        } catch (err) {
            toast.error("商品の読み込み失敗:", err);
            setErrorMsg("商品リストの読み込み中にエラーが発生しました。");
        }
    };

    // 광고 목록 가져오기 (공개 API: authAdmin 제거됨)
    const fetchAds = async () => {
        try {
            const res = await axiosInstance.get("/api/admin/ad-images");
            setAds(res.data);
        } catch (err) {
            toast.error("広告の読み込みに失敗:", err);
            setErrorMsg("広告リストの読み込み中にエラーが発生しました。");
        }
    };

    // 광고 업로드
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct || !imageFile) {
            alert("商品を選択し、画像ファイルをアップロードしてください。");
            return;
        }
        if (ads.length >= 5) {
            alert("広告は最大5つまで登録できます。");
            return;
        }

        const formData = new FormData();
        formData.append("productId", selectedProduct._id);
        formData.append("image", imageFile);

        try {
            await axiosInstance.post("/api/admin/ad-images", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("広告が登録されました。");
            setSelectedProduct(null);
            setImageFile(null);
            setSearchTerm("");
            fetchAds();
        } catch (err) {
            toast.error("広告登録失敗:", err);
            if (err.response?.status === 403) {
                alert(
                    "権限がないか、CSRFトークンが無効です。 もう一度ログインしてください。"
                );
            } else {
                alert("広告の登録中にエラーが発生しました。");
            }
        }
    };

    // 광고 삭제
    // const handleDelete = async (id) => {
    //     if (!window.confirm("この広告を削除しますか")) return;
    //     try {
    //         await axiosInstance.delete(`/api/admin/ad-images/${id}`);
    //         fetchAds();
    //     } catch (err) {
    //         toast.error("広告削除失敗:", err);
    //         alert("広告の削除中にエラーが発生しました。");
    //     }
    // };

const handleDelete = async (id) => {
    const isConfirmed = await confirm({
        title: "広告削除",
        text: "この広告を削除しますか？",
        confirmText: "削除",
        cancelText: "キャンセル",
    });

    if (!isConfirmed) return;

    try {
        await axiosInstance.delete(`/api/admin/ad-images/${id}`);
        fetchAds();
        toast.success("広告を削除しました。");
    } catch (err) {
        toast.error("広告の削除に失敗しました。");
    }
};

    // 광고 순서 변경 (up / down)
    const moveAd = async (id, direction) => {
        try {
            await axiosInstance.patch(`/api/admin/ad-images/order/${id}`, {
                direction,
            });
            fetchAds();
        } catch (err) {
            toast.error("広告順序変更失敗:", err);
            alert("広告の順番の変更中にエラーが発生しました。");
        }
    };

    // 상품 검색 필터
    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">広告イメージ管理</h2>

            {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}

            {/* ─ 광고 등록 폼 ─ */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block mb-1 font-medium">商品検索</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="商品名を入力してください"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => setSelectedProduct(product)}
                            className={`px-2 py-1 cursor-pointer rounded ${
                                selectedProduct?._id === product._id
                                    ? "bg-blue-100 border border-blue-400"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {product.title}
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <p className="text-gray-500">検索結果がありません。</p>
                    )}
                </div>

                {selectedProduct && (
                    <p className="text-green-700">
                        選ばれた商品: <strong>{selectedProduct.title}</strong>
                    </p>
                )}

                <div>
                    <label className="block mb-1 font-medium">
                        広告イメージファイル
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="block"
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                    広告登録
                </button>
            </form>

            {/* ─ 등록된 광고 목록 ─ */}
            <h3 className="text-xl font-semibold mb-2">登録された広告</h3>
            {ads.length === 0 ? (
                <p className="text-gray-500">登録された広告がありません。</p>
            ) : (
                <ul className="space-y-4">
                    {ads.map((ad, idx) => (
                        <li
                            key={ad._id}
                            className="flex items-center justify-between border rounded p-3"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={`${import.meta.env.VITE_SERVER_URL}/${
                                        ad.image
                                    }`}
                                    alt={ad.product?.title}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">
                                        {ad.product?.title}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        順序: {ad.order}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => moveAd(ad._id, "up")}
                                    disabled={ad.order === 1}
                                    className={`px-2 py-1 text-sm rounded ${
                                        ad.order === 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                >
                                    ▲
                                </button>
                                <button
                                    onClick={() => moveAd(ad._id, "down")}
                                    disabled={ad.order === ads.length}
                                    className={`px-2 py-1 text-sm rounded ${
                                        ad.order === ads.length
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                >
                                    ▼
                                </button>
                                <button
                                    onClick={() => handleDelete(ad._id)}
                                    className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    削除
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
