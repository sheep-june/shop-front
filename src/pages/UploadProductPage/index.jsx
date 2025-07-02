import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import { toast } from "react-toastify";
import usePageTitle from "../../hooks/usePageTitle";

const continents = [
    // { key: 1, value: "패션의류/잡화" },
    // { key: 2, value: "뷰티" },
    // { key: 3, value: "출산/유아동" },
    // { key: 4, value: "식품" },
    // { key: 5, value: "주방용품" },
    // { key: 6, value: "생활용품" },
    // { key: 7, value: "홈인테리어" },
    // { key: 8, value: "가전디지털" },
    // { key: 9, value: "스포츠/레저" },
    // { key: 10, value: "자동차용품" },
    // { key: 11, value: "도서/음반/DVD" },
    // { key: 12, value: "완구/취미" },
    // { key: 13, value: "문구/오피스" },
    // { key: 14, value: "반려동물용품" },
    // { key: 15, value: "헬스/건강식품" },
    { key: 1, value: "ファッション・服飾雑貨" },
    { key: 2, value: "ビューティー" },
    { key: 3, value: "出産・ベビー・キッズ" },
    { key: 4, value: "食品" },
    { key: 5, value: "キッチン用品" },
    { key: 6, value: "生活用品" },
    { key: 7, value: "ホームインテリア" },
    { key: 8, value: "家電・デジタル" },
    { key: 9, value: "スポーツ・レジャー" },
    { key: 10, value: "カー用品" },
    { key: 11, value: "本・CD・DVD" },
    { key: 12, value: "おもちゃ・ホビー" },
    { key: 13, value: "文房具・オフィス用品" },
    { key: 14, value: "ペット用品" },
    { key: 15, value: "健康・サプリメント" },
];

const UploadProductPage = () => {
    usePageTitle("商品をアップロードしてください！");
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: 0,
        continents: 1,
        images: [],
    });

    const userData = useSelector((state) => state.user?.userData);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        //배포설정
        let newValue = value;

        if (name === "continents") {
            newValue = Number(value); // 숫자 변환
        }
        setProduct((prevState) => ({
            ...prevState,
            // [name]: value,
            [name]: newValue,
        }));
    };

    const handleImages = (newImages) => {
        setProduct((prevState) => ({
            ...prevState,
            images: newImages,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const body = {
            writer: userData.id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.continents,
            images: product.images,
        };

        try {
            await axiosInstance.post("/products", body);
            toast.success("商品のアップロードに成功しました。");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("商品のアップロードに失敗しました。");
        }
    };

    return (
        <section>
            <div className="text-center m-7">
                <h1>商品アップロード</h1>
            </div>

            <form
                className="mt-6"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                        e.preventDefault();
                    }
                }}
            >
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
                    <label htmlFor="continents">カテゴリー</label>
                    <select
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4C4] focus:border-[#00C4C4]"
                        name="continents"
                        id="continents"
                        onChange={handleChange}
                        value={product.continents}
                    >
                        {continents.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label htmlFor="description">商品説明</label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4C4] focus:border-[#00C4C4]"
                        rows={10}
                        placeholder="商品の説明を入力してください。"
                        onChange={handleChange}
                        value={product.description}
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-[#00C4C4] border border-[#00C4C4] bg-white rounded-md hover:bg-[#00C4C4] hover:text-white transition"
                    >
                        アップロード
                    </button>
                </div>
            </form>
        </section>
    );
};

export default UploadProductPage;
