import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useConfirmAlert } from "../../hooks/useConfirmAlert";

const AdminAdSection = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [ads, setAds] = useState([]);

    const { confirm } = useConfirmAlert();

    useEffect(() => {
        fetchProducts();
        fetchAds();
    }, []);

    const fetchProducts = async () => {
        try {
            // const res = await axiosInstance.get("/products");
            const res = await axiosInstance.get("/products", {
        params: {
            skip: 0,
            limit: 1000,  // 필요에 따라 조정
             // sort: "createdAt",  // 정렬이 필요하면 추가
            // filters: {}         // 필터가 필요하면 추가
        },
    });
            setProducts(res.data.products);
        } catch (err) {
            toast.error("상품 불러오기 실패:", err);
        }
    };

    const fetchAds = async () => {
        try {
            const res = await axiosInstance.get("/api/admin/ads");
            setAds(res.data);
        } catch (err) {
            toast.error("広告の読み込みに失敗:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProduct || !videoFile) {
            alert("商品と映像ファイルを選択してください。");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("productId", selectedProduct._id);
            formData.append("video", videoFile);

            await axiosInstance.post("/api/admin/ads", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("広告が登録されました。");
            setSelectedProduct(null);
            setVideoFile(null);
            setSearchTerm("");
            fetchAds();
        } catch (err) {
            toast.error("広告登録失敗:", err);
            alert("広告登録エラー発生");
        }
    };

    // const handleDelete = async (id) => {
    //     if (!window.confirm("이 광고를 삭제하시겠습니까?")) return;

    //     try {
    //         await axiosInstance.delete(`/api/admin/ads/${id}`);
    //         fetchAds();
    //     } catch (err) {
    //         toast.error("광고 삭제 실패:", err);
    //     }
    // };
    const handleDelete = async (id) => {
    const isConfirmed = await confirm({
        title: "広告削除",
        text: "この広告を削除しますか",
        confirmText: "削除",
        cancelText: "キャンセル",
    });

    if (!isConfirmed) return;

    try {
        await axiosInstance.delete(`/api/admin/ads/${id}`);
        fetchAds();
        toast.success("広告削除完了");
    } catch (err) {
        toast.error("広告削除失敗");
    }
};

    const moveAd = async (fromIndex, toIndex) => {
        if (toIndex < 0 || toIndex >= ads.length) return;

        const reordered = [...ads];
        const moved = reordered.splice(fromIndex, 1)[0];
        reordered.splice(toIndex, 0, moved);

        try {
            console.log("adminToken:", localStorage.getItem("adminToken"));
            console.log("csrfToken:", localStorage.getItem("csrfToken"));

            await axiosInstance.post("/api/admin/ads/reorder", {
                ads: reordered.map((ad) => ad._id),
            });

            setAds(reordered);
        } catch (err) {
            toast.error("順序変更失敗:", err);
            alert("広告の順番の変更に失敗しました。");
        }
    };

    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">広告登録</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">商品検索</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="商品名を入力してください"
                        className="w-full border p-2"
                    />
                </div>

                <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-2 bg-gray-50">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className={`p-2 cursor-pointer border rounded ${
                                selectedProduct?._id === product._id
                                    ? "bg-blue-100 border-blue-500"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedProduct(product)}
                        >
                            {product.title}
                        </div>
                    ))}
                </div>

                {selectedProduct && (
                    <div className="text-sm text-green-700">
                        選ばれた商品: <strong>{selectedProduct.title}</strong>
                    </div>
                )}

                <div>
                    <label className="block mb-1 font-medium">
                        광고 영상 (최대 15초)
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                        className="block"
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                >
                    광고 등록
                </button>
            </form>

            <hr className="my-6" />
            <h3 className="text-lg font-bold mb-2">등록된 광고</h3>
            <ul className="space-y-3">
                {ads.map((ad, idx) => (
                    <li
                        key={ad._id}
                        className="border p-2 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-medium">{ad.product?.title}</p>
                            <video
                                // src={`http://localhost:4000/uploads/ads/${ad.video}`}
                                src={`${
                                    import.meta.env.VITE_SERVER_URL
                                }/upimport { useConfirmAlert } from '../../hooks/useConfirmAlert';
loads/ads/${ad.video}`}
                                width="200"
                                controls
                                muted
                            />
                        </div>

                        <div className="space-x-2">
                            <button
                                onClick={() => moveAd(idx, idx - 1)}
                                className="px-2 py-1 text-sm bg-gray-200 rounded"
                            >
                                ⬆️
                            </button>
                            <button
                                onClick={() => moveAd(idx, idx + 1)}
                                className="px-2 py-1 text-sm bg-gray-200 rounded"
                            >
                                ⬇️
                            </button>
                            <button
                                onClick={() => handleDelete(ad._id)}
                                className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AdminAdSection;
