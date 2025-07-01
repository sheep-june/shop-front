import React from 'react';
import { Link } from 'react-router-dom';

// SliderSection ↔ CardItem 에서 쓰던 서버 URL 가져오기
const serverUrl = import.meta.env.VITE_SERVER_URL;

const CardItem2 = ({ product }) => {
  const { _id, images = [], title = '', price = 0 } = product;

  // SliderSection/CardItem과 **100% 동일**하게 URL 배열로 변환
  const imageUrls = Array.isArray(images)
    ? images.map((name) => `${serverUrl}/uploads/${name}`)
    : [];

  const imgSrc = imageUrls[0] || '/placeholder.png';

  return (
    <Link
      to={`/product/${_id}`}
      className="group block relative w-full aspect-square overflow-hidden"
    >
      <img
        src={imgSrc}
        alt={title}
        className="object-cover w-full h-full"
      />

      {/* hover 시 하단 박스만 어두워지고 title+price 같이 노출 */}
      <div
        className="
          absolute bottom-0 left-0 w-full
          px-4 py-3
          bg-white bg-opacity-30
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
          group-hover:bg-black group-hover:bg-opacity-50
          flex flex-col
        "
      >
        <p className="text-white text-sm font-medium truncate">
          {title}
        </p>
        <p className="mt-1 text-white text-base font-semibold">
          {price.toLocaleString()}円
        </p>
      </div>
    </Link>
  );
};

export default CardItem2;
