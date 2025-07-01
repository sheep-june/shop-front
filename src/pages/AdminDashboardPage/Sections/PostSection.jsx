import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import { useConfirmAlert } from "../../../hooks/useConfirmAlert";
import ReactPaginate from "react-paginate";

const POSTS_PER_PAGE = 10;

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("adminToken");
  const { confirm } = useConfirmAlert();

  // 게시글 목록 불러오기
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/admin/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch {
      toast.error("投稿の読み込み失敗");
    }
  };

  // 게시글 삭제
  const handleDeletePost = async (id) => {
    const isConfirmed = await confirm({
      title: "投稿削除",
      text: "本当にこの投稿を削除しますか？",
      confirmText: "削除",
      cancelText: "キャンセル",
    });
    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/admin/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch {
      toast.error("投稿の削除に失敗");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 검색 및 필터링
  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase())
  );

  // 페이지 계산
  const pageCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(offset, offset + POSTS_PER_PAGE);

  return (
    <div>
      {/* 검색창 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="検索"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-[#00C4C4] p-2 w-full rounded focus:outline-none focus:border-2 focus:border-[#00C4C4]"
        />
      </div>

      {/* 게시글 목록 */}
      <ul className="space-y-2">
        {currentPosts.map((post) => (
          <li
            key={post._id}
            className="flex items-center justify-between border border-[#00C4C4] p-3 rounded"
          >
            <div className="w-full pr-4">
              <p className="font-semibold">題目: {post.title}</p>
              <p className="text-gray-700 truncate max-w-[500px]">
                内容: {post.description}
              </p>
            </div>
            <button
              onClick={() => handleDeletePost(post._id)}
              className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          {/* 맨 처음 */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-[#00C4C4] rounded transition-colors duration-200 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "text-[#00C4C4] bg-white hover:bg-[#00C4C4] hover:text-white"
            }`}
          >
            最初へ
          </button>

          {/* 이전 */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-[#00C4C4] rounded transition-colors duration-200 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "text-[#00C4C4] bg-white hover:bg-[#00C4C4] hover:text-white"
            }`}
          >
            	前へ
          </button>

          {/* 페이지 번호 */}
          <ReactPaginate
            forcePage={currentPage - 1}
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            breakLabel="..."
            containerClassName="flex space-x-2"
            pageClassName=""
            pageLinkClassName="px-3 py-1 text-[#00C4C4] border border-[#00C4C4] rounded transition-colors duration-200 hover:bg-[#00C4C4] hover:text-white"
            activeClassName=""
            activeLinkClassName="bg-[#00C4C4] text-white"
            breakClassName=""
            breakLinkClassName="px-3 py-1 text-[#00C4C4]"
            previousLabel={null}
            nextLabel={null}
          />

          {/* 다음 */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
            disabled={currentPage === pageCount}
            className={`px-3 py-1 border border-[#00C4C4] rounded transition-colors duration-200 ${
              currentPage === pageCount
                ? "opacity-50 cursor-not-allowed"
                : "text-[#00C4C4] bg-white hover:bg-[#00C4C4] hover:text-white"
            }`}
          >
            次へ
          </button>

          {/* 맨 끝 */}
          <button
            onClick={() => setCurrentPage(pageCount)}
            disabled={currentPage === pageCount}
            className={`px-3 py-1 border border-[#00C4C4] rounded transition-colors duration-200 ${
              currentPage === pageCount
                ? "opacity-50 cursor-not-allowed"
                : "text-[#00C4C4] bg-white hover:bg-[#00C4C4] hover:text-white"
            }`}
          >
            最後へ
          </button>
        </div>
      )}
    </div>
  );
};

export default PostSection;
