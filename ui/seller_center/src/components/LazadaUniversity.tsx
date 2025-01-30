const LazadaUniversity = () => {
  const courses = [
    {
      id: 5942,
      title: "[Video] Cách tham gia Chương trình khuyến mãi dành cho NBH mới",
      subtitle: "New Seller Program",
      imgUrl:
        "https://lzd-img-global.slatic.net/g/ot/common/a9d210fd6ed0447ebf2b27a39603d729.png_2200x2200q80.png_.webp",
      views: "26,616",
    },
    {
      id: 9425,
      title: "Đầu tư và thu nhiều lợi nhuận",
      subtitle: "New Seller Program",
      imgUrl:
        "https://lzd-img-global.slatic.net/g/ot/common/8cd051374aed4e5eafb47f4e80bb51cd.png_2200x2200q80.png_.webp",
      views: "11,165",
    },
    {
      id: 9426,
      title: "Am hiểu chỉ số kinh doanh",
      subtitle: "New Seller Program",
      imgUrl:
        "https://lzd-img-global.slatic.net/g/ot/common/413e5e55a8994b34b6b3aca137adba48.png_2200x2200q80.png_.webp",
      views: "6,532",
    },
    {
      id: 9427,
      title: "Khuyến mãi lớn, truy cập khủng và chốt đơn mới",
      subtitle: "New Seller Program",
      imgUrl:
        "https://lzd-img-global.slatic.net/g/ot/common/0ac27d0df11746998a130ab0cf2651ad.png_2200x2200q80.png_.webp",
      views: "7,895",
    },
  ];

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Đại học Lazada</h2>
        <button className="text-blue-500 flex items-center">
          <i className="fas fa-sync-alt mr-2"></i>Tải khóa học mới
        </button>
        <a
          href="https://university.lazada.vn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 flex items-center"
        >
          Thêm <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
      <p className="text-gray-500">Khóa học dành cho bạn</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <a
            key={course.id}
            href={`https://university.lazada.vn/course/learn?id=${course.id}&type=video`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-gray-100 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={course.imgUrl}
              alt={course.title}
              className="h-28 w-full object-cover rounded-lg mb-3"
            />
            <p className="text-sm font-semibold">{course.subtitle}</p>
            <h3 className="text-gray-700 text-base">{course.title}</h3>
            <div className="mt-2 flex items-center text-gray-600">
              <i className="fas fa-eye mr-1"></i>
              <span>{course.views}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LazadaUniversity;
