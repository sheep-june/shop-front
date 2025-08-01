import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const BoardPage = () => {
    const navigate = useNavigate();
    usePageTitle("掲示板");

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">掲示板</h2>
            <div className="flex space-x-4 mb-6">
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => navigate("/board/faq")}
                >
                    FAQ
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => navigate("/board/question")}
                >
                    質問掲示板
                </button>
            </div>
        </div>
    );
};

export default BoardPage;
