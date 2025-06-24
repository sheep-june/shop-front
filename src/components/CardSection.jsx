import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem2 from "../pages/LandingPage/Sections/CardItem2";

const CardSection = ({
    title1,
    title2,
    sort = "sold", // “sold” | “views” | “rating”
    filters = {}, // SliderSection에선 항상 빈 객체 {}, 여기서도 동일하게
}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // SliderSection과 똑같이 filters: {} 까지 포함
                const { data } = await axiosInstance.get("/products", {
                    params: { sort, limit: 8, filters: {} },
                });
                setProducts(Array.isArray(data.products) ? data.products : []);
            } catch (err) {
                console.error("CardSection 상품 불러오기 실패:", err);
            }
        };

        fetchProducts();
    }, [sort]); // SliderSection은 [sort, title], title 없으니 [sort]만 있어도 OK

    return (
        <section className="py-12">
            {(title1 || title2) && (
                <div className="text-center mb-8">
                    {title1 && <h2 className="text-3xl font-bold">{title1}</h2>}
                    {title2 && <p className="mt-2 text-gray-600">{title2}</p>}
                </div>
            )}

            {/* 4×2 그리드, 데이터는 이미 limit=8이라 slice 불필요 */}
            <div className="grid grid-cols-4 gap-6">
                {products.map((p) => (
                    <div key={p._id} className="group">
                        <CardItem2 product={p} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CardSection;
