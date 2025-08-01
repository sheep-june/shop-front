import React, { useEffect, useState } from "react";
// import CardItem from "./Sections/CardItem";
import axiosInstance, { setCsrfToken } from "../../utils/axios";
// import { prices } from "../../utils/filterData";
// import AdSlider from "../../components/AdSlider/AdSlider";
import { useNavigate } from "react-router-dom";
import SliderSection from "../../components/SliderSection";
import usePageTitle from "../../hooks/usePageTitle";
import AdImageSlider from "../../components/AdSlider/AdImageSlider";
import CardSection from "../../components/CardSection";

const LandingPage = () => {
    const navigate = useNavigate();
    const limit = 4;
    // const [searchTerm, setSearchTerm] = useState("");
    // const [setProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [skip] = useState(0);
    // const [skip, setSkip] = useState(0);
    // const [setHasMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    // const [filters, setFilters] = useState({
    //     categories: [],
    //     price: [],
    // });
    const [quickSearch, setQuickSearch] = useState("");

    usePageTitle("買う売る");

    useEffect(() => {
        setCsrfToken();
        fetchProducts({ skip, limit });
    }, [skip]);

    const fetchProducts = async ({
        skip,
        limit,
        loadMore = false,
        filters = {},
        searchTerm = "",
    }) => {
        try {
            const params = { skip, limit, filters, searchTerm };
            const response = await axiosInstance.get("/products", { params });
            if (loadMore) {
                setProducts((prev) => [...prev, ...response.data.products]);
            } else {
                setProducts(response.data.products);
            }
            setHasMore(response.data.hasMore);
        } catch (error) {
            console.error(error);
        }
    };

    const handleQuickSearch = (e) => {
        if (e.key === "Enter" && quickSearch.trim()) {
            navigate(`/search?query=${encodeURIComponent(quickSearch.trim())}`);
        }
    };

    const handleClickSearch = () => {
        if (quickSearch.trim()) {
            navigate(`/search?query=${encodeURIComponent(quickSearch.trim())}`);
        }
    };

    return (
        <section>
            <div className="flex justify-center items-center gap-2 mt-8 mb-5">
                <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    onKeyDown={handleQuickSearch}
                    placeholder="商品を検索してみてください"
                    className="w-full max-w-md border border-[#00C4C4] p-2 rounded-2xl 
             focus:outline-none focus:ring-0 focus:border-2 focus:border-[#00C4C4]"
                />

                <button
                    onClick={handleClickSearch}
                    className="px-4 py-2 bg-white text-[#00C4C4] border border-[#00C4C4] rounded-2xl 
             hover:bg-[#00C4C4] hover:text-white"
                >
                    検索
                </button>
            </div>
            {/* <AdSlider /> */}
            {/* <AdVideoSlider/> */}
            {/* <NewAdVideoSlider /> */}
            <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2">
                <AdImageSlider />
            </div>

            {/* <AdImageSlider /> */}

            {/* <SliderSection
                title="지금 가장 많이 팔린 베스트셀러!"
                sort="sold"
            />
            <SliderSection
                title="사람들이 가장 많이 클릭한 인기 상품!"
                sort="views"
            />
            <SliderSection
                title="가장 후기가 좋은 상품은 여기!"
                sort="rating"
            /> */}
            {/* <CardSection
                title1="가장 많이 팔림"
                title2="빨리 너도 돈 써"
                sort="sold"
            />
            <CardSection
                title1="가장 많이 봄"
                title2="빨리 너도 돈 써"
                sort="views"
            />
            <CardSection
                title1="가장 많이 좋아함"
                title2="빨리 너도 돈 써"
                sort="rating"
            /> */}
            {/* <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"> */}
            <div className="max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
                <CardSection
                    title1="Bestseller"
                    title2="ベストセラー"
                    sort="sold"
                />
                <CardSection
                    title1="Most Viewed"
                    title2="注目商品"
                    sort="views"
                />
                <CardSection
                    title1="Top Rated"
                    title2="口コミで人気"
                    sort="rating"
                />
            </div>
        </section>
    );
};

export default LandingPage;
