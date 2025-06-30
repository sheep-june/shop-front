// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  if (totalPages <= 5) {
    // 5이하면 전부 표시
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    // 무조건 첫 페이지
    pages.push(1);

    // 앞 3페이지 이내가 아니면 생략 기호
    if (currentPage > 3) {
      pages.push("start-ellipsis");
    }

    // 항상 현재 페이지 기준 ±1만 표시
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let p = start; p <= end; p++) {
      pages.push(p);
    }

    // 뒤 3페이지 이내가 아니면 생략 기호
    if (currentPage < totalPages - 2) {
      pages.push("end-ellipsis");
    }

    // 무조건 마지막 페이지
    pages.push(totalPages);
  }

  return (
    <div className="flex space-x-2">
      {pages.map((p, idx) =>
        p === "start-ellipsis" || p === "end-ellipsis" ? (
          <span key={idx} className="px-3 py-1 text-gray-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded transition-colors duration-200 ${
              p === currentPage
                ? "bg-[#00C4C4] text-white border-[#00C4C4]"
                : "bg-white text-[#00C4C4] border border-[#00C4C4] hover:bg-[#00C4C4] hover:text-white"
            }`}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
