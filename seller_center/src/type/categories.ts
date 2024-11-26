type Category = {
  id: string;
  name: string;
  children?: Category[]; // Danh mục con là một mảng các Category khác
};

// Ví dụ dữ liệu danh mục
const categories: Category[] = [
  {
    id: "1",
    name: "Thể thao & Hoạt động ngoài trời",
    children: [
      {
        id: "1-1",
        name: "Thiết bị thể thao & thể hình",
        children: [
          {
            id: "1-1-1",
            name: "Phụ kiện",
            children: [
              { id: "1-1-1-1", name: "Bình nước thể thao" },
              { id: "1-1-1-2", name: "Ống bơm" },
              { id: "1-1-1-3", name: "Túi y tế" },
              { id: "1-1-1-4", name: "Nẹp & Hỗ trợ" },
            ],
          },
        ],
      },
      {
        id: "1-2",
        name: "Hoạt động dã ngoại",
        children: [
          {
            id: "1-1-1",
            name: "Câu cá",
            children: [
              { id: "1-1-1-1", name: "Phụ kiện" },
              { id: "1-1-1-2", name: "Cần câu" },
              { id: "1-1-1-3", name: "Bộ quay kéo" },
              { id: "1-1-1-4", name: "Nguyên bộ cần và bộ quay" },
              { id: "1-1-1-5", name: "Bình nước thể thao" },
              { id: "1-1-1-6", name: "Dây câu" },
              { id: "1-1-1-7", name: "Các dụng cụ câu cá" },
              { id: "1-1-1-8", name: "Định vị cá & GPS" },
              { id: "1-1-1-9", name: "Lưới bắt cá" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Ô tô, xe máy & thiết bị định vị",
    children: [
      {
        id: "2-1",
        name: "Ô tô",
        children: [
          { id: "2-1-1", name: "Kiểm tra & thẩm định" },
          {
            id: "2-1-2",
            name: "Phụ kiện ngoài ô tô",
            children: [
              { id: "2-1-2-1", name: "Phụ kiện bảo vệ cửa xe" },
              { id: "2-1-2-2", name: "Vè chắn mưa" },
            ],
          },
          {
            id: "2-1-3",
            name: "Phụ kiện trong ô tô",
            children: [
              { id: "2-1-3-1", name: "Nệm hơi" },
              { id: "2-1-3-2", name: "Gạt tàn" },
              {
                id: "2-1-3-3",
                name: "Thiết bị an toàn",
                children: [
                  { id: "2-1-3-3-1", name: "Ghế đua" },
                  { id: "2-1-3-3-2", name: "Bộ dụng cụ sơ cứu và an toàn" },
                  { id: "2-1-3-3-3", name: "Dụng cụ thoát hiểm" },
                  { id: "2-1-3-3-4", name: "Trang phục đua xe" },
                ],
              },
            ],
          },
        ],
      },
      { id: "2-2", name: "Xe máy" },
    ],
  },
];

export default categories;
