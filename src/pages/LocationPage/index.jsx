import { useEffect } from "react";

const LocationPage = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
            import.meta.env.VITE_KAKAO_MAP_API_KEY
        }&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(37.515322, 126.907129),
                    level: 1, // ✅ 더 확대된 뷰
                };

                const map = new window.kakao.maps.Map(container, options);
                const geocoder = new window.kakao.maps.services.Geocoder();

                geocoder.addressSearch(
                    "서울특별시 영등포구 영중로56 신한빌딩 4층",
                    function (result, status) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const coords = new window.kakao.maps.LatLng(
                                result[0].y,
                                result[0].x
                            );

                            new window.kakao.maps.Marker({
                                map: map,
                                position: coords,
                            });

                            map.setCenter(coords);
                        }
                    }
                );
            });
        };
        document.head.appendChild(script);
    }, []);

    return (
        <div className="w-full flex flex-col items-center px-4 py-8">
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#00C4C4]">
                【弊社本社へのアクセス】 住所：〒07250 ソウル特別市 永登浦区
                永中路56（シンハンビル 4階）
            </h2>
            <div
                id="map"
                className="w-full max-w-4xl h-[500px] rounded-xl shadow-lg border-4 border-[#00C4C4]"
            />
        </div>
    );
};

export default LocationPage;
