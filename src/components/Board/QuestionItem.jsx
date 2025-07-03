// import { useState } from "react";
// import CommentBox from "./CommentBox";
// import dayjs from "dayjs";
// import "dayjs/locale/ja";

// // 전역 로케일을 일본어로 설정
// dayjs.locale("ja");


// const QuestionItem = ({ question, isAdmin, refresh }) => {
//     const [showCommentForm, setShowCommentForm] = useState(false);

//     const toggleForm = () => {
//         setShowCommentForm((prev) => !prev);
//     };

//     return (
//         <div className="border rounded mb-4 p-4">
//             <div className="mb-2">
//                 <h3 className="text-lg font-semibold">{question.title}</h3>
//                 <p className="text-gray-700 whitespace-pre-line mt-1">
//                     {question.content}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-2">
//                     作成者: {question.user?.name || "ユーザー"} /{" "}
//                     {new Date(question.createdAt).toLocaleString()}
//                 </p>
//             </div>

//             {question.comment ? (
//                 <div className="mt-4 border-t pt-3 text-sm bg-gray-50 p-3 rounded">
//                     <p className="text-gray-800 font-medium">💬 管理者答弁</p>
//                     <p className="text-gray-700 mt-1 whitespace-pre-line">
//                         {question.comment.content}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-2 text-right">
//                         作成者: {question.comment.admin?.name || "管理者"} /{" "}
//                         {dayjs(question.createdAt).format(
//             "YYYY年MM月DD日 HH時mm分ss秒"
//           )}
//                     </p>
//                 </div>
//             ) : isAdmin ? (
//                 <>
//                     <button
//                         className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//                         onClick={toggleForm}
//                     >
//                         {showCommentForm ? "キャンセル" : "答弁作成"}
//                     </button>
//                     {showCommentForm && (
//                         <CommentBox
//                             questionId={question._id}
//                             onFinish={refresh}
//                             onClose={toggleForm}
//                         />
//                     )}
//                 </>
//             ) : (
//                 <p className="mt-3 text-sm text-gray-400"> ※ 返事待ち</p>
//             )}
//         </div>
//     );
// };

// export default QuestionItem;


// shop-front/src/components/QuestionItem.jsx

import { useState } from "react";
import CommentBox from "./CommentBox";
import dayjs from "dayjs";
import "dayjs/locale/ja";

// 전역 로케일을 일본어로 설정
dayjs.locale("ja");

const QuestionItem = ({ question, isAdmin, refresh }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleForm = () => {
    setShowCommentForm((prev) => !prev);
  };

  return (
    <div className="border rounded mb-4 p-4">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">{question.title}</h3>
        <p className="text-gray-700 whitespace-pre-line mt-1">
          {question.content}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          作成者: {question.user?.name || "ユーザー"} /{" "}
          {dayjs(question.createdAt).format("YYYY年MM月DD日 HH時mm分ss秒")}
        </p>
      </div>

      {question.comment ? (
        <div className="mt-4 border-t pt-3 text-sm bg-gray-50 p-3 rounded">
          <p className="text-gray-800 font-medium">💬 管理者答弁</p>
          <p className="text-gray-700 mt-1 whitespace-pre-line">
            {question.comment.content}
          </p>
          <p className="text-xs text-gray-400 mt-2 text-right">
            作成者: {question.comment.admin?.name || "管理者"} /{" "}
            {dayjs(question.comment.createdAt).format(
              "YYYY年MM月DD日 HH時mm分ss秒"
            )}
          </p>
        </div>
      ) : isAdmin ? (
        <>
          <button
            className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            onClick={toggleForm}
          >
            {showCommentForm ? "キャンセル" : "答弁作成"}
          </button>
          {showCommentForm && (
            <CommentBox
              questionId={question._id}
              onFinish={refresh}
              onClose={toggleForm}
            />
          )}
        </>
      ) : (
        <p className="mt-3 text-sm text-gray-400">※ 返事待ち</p>
      )}
    </div>
  );
};

export default QuestionItem;
