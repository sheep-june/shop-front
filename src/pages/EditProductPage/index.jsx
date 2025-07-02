import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance, { setCsrfToken } from "../../utils/axios";
import FileUpload from "../../components/FileUpload";
import { toast } from "react-toastify";
import { categories } from "../../utils/filterData";
import usePageTitle from "../../hooks/usePageTitle";

const EditProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user?.userData);
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0,
        category: 1,
        images: [],
    });

    usePageTitle("商品修正");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(
                    `/products/${productId}?type=single`
                );
                setProduct(res.data[0]);
            } catch (err) {
                toast.error("商品情報の読み込み失敗:", err);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImages = (newImages) => {
        setProduct((prev) => ({ ...prev, images: newImages }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setCsrfToken();
            await axiosInstance.put(`/products/${productId}`, {
                ...product,
                writer: userData.id,
            });
            toast.success("商品が修正されました。");
            setTimeout(() => {
                navigate("/user/myproducts");
            }, 2000);
        } catch (err) {
            console.error("修正失敗:", err);
            toast.error("修正中にエラーが発生");
        }
    };

    if (!product || !product.images) {
        return (
            <p className="text-center mt-10">
                商品情報を読み込んでいます···
            </p>
        );
    }

    return (
        <section>
            <div className="text-center m-7">
                <h1>商品修正</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-6">
                <FileUpload
                    images={product.images}
                    onImageChange={handleImages}
                />
                <div className="mt-4">
                    <label htmlFor="title">商品名</label>
                    <input
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4C4] focus:border-[#00C4C4]"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        value={product.title}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="price">価格</label>
                    <input
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4C4] focus:border-[#00C4C4]"
                        type="number"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        value={product.price}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="category">カテゴリー</label>
                    <select
                        className="w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4C4] focus:border-[#00C4C4]"
                        name="category"
                        id="category"
                        onChange={handleChange}
                        value={product.category}
                    >
                        {categories.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label htmlFor="description">商品情報</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={6}
                        onChange={handleChange}
                        value={product.description}
                        className="w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4C4] focus:border-[#00C4C4]"
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-[#00C4C4] border border-[#00C4C4] bg-white rounded-md hover:bg-[#00C4C4] hover:text-white transition-colors duration-200"
                    >
                        修正
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditProductPage;
