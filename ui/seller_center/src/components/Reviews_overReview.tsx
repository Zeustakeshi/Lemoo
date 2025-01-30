import Overview from "./OverView";
import ToolsReply from "./ToolsReply";

const ReviewsOverReview = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Quản lý đánh giá</h2>{" "}
      {/* Tiêu đề chính */}
      <Overview />
      <ToolsReply />
    </div>
  );
};

export default ReviewsOverReview;
