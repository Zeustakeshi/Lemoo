import ReviewCard from "./ReviewCard";

const ToolsReply = () => {
  const reviewItems = [
    {
      icon: "https://i.imgur.com/WVqJDzr.png",
      title: "Phản hồi nhanh",
      description: "Trả lời nhanh đánh giá",
    },
    {
      icon: "https://i.imgur.com/WVqJDzr.png",
      title: "Trung tâm phân tích đánh giá",
      description: "Dễ dàng theo dõi đánh giá của cửa hàng",
    },
    {
      icon: "https://i.imgur.com/WVqJDzr.png",
      title: "Chương trình Review Nhận Thưởng",
      description: "Tăng cường đánh giá cho sản phẩm của bạn",
      newTag: true,
    },
    {
      icon: "https://i.imgur.com/WVqJDzr.png",
      title: "Đánh giá bên ngoài",
      description: "Quản lý đánh giá đã nhập",
    },
    {
      icon: "https://i.imgur.com/WVqJDzr.png",
      title: "Câu hỏi của khách hàng",
      description: "Kiểm tra và trả lời các câu hỏi từ khách hàng",
    },
    {
      icon: "https://i.imgur.com/WVqJDzr.png",
      title: "Chương trình LazCoins",
      description: "Tận hưởng nhiều đặc quyền với LazCoins",
      newTag: true,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border mt-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Công cụ trả lời</h3>
      <p className="text-sm text-gray-600 mb-6">
        Các công cụ hữu ích giúp bạn quản lý và lấy đánh giá cho cửa hàng
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewItems.map((item, index) => (
          <ReviewCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            newTag={item.newTag}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolsReply;
