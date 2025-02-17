export const ProductDetailData = {
  // Một số nhỏ(tên cửa hàng, id => click vào đi để trang profile của cửa hàng http://lemoo.com:5173/store/$id) thông tin của cửa hàng
  data: {
    totalPages: 10,
    totalElements: 3,
    size: 3,
    content: {
      // Thông tin sản phẩm
      id: "yOVke-zxGJlWPwmXD0HOc",
      name: "Áo thun siêu co giãn",
      image: [
        "https://i.pinimg.com/736x/d9/a6/61/d9a6614827a5b1ef4135119fb0e04398.jpg",
        "https://i.pinimg.com/474x/a9/7b/34/a97b34070798f52691f996c5a9680ef0.jpg",
        "https://i.pinimg.com/474x/4f/dd/e8/4fdde8c6e22103daa39fb0a2b4f39e53.jpg",
        "https://i.pinimg.com/474x/6f/4b/23/6f4b236b160c251cb3a297ac90986861.jpg",
      ], // một mảng để đưa vào carousel
      status: "LIVE",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      long_description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      price: 299000,
      // Thông tin cửa hàng
      store: {
        storeId: "ST123456",
        storeName: "Farm store",
        storeLogo:
          "https://i.pinimg.com/474x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg",
        rating: 4.8, // Điểm đánh giá trung bình
        reviewCount: 1287, // Số lượng đánh giá
        followers: 54000, // Số người theo dõi
      },
      // Những biến thể của sản phẩm
      skus: [
        {
          id: "eLebD3PzI6s3FHNmznJyB",
          sellerSku: "Uvjto5CLgfK3C2jTBV92A",
          name: "Áo thun - thường - M",
          allowSale: true,
          stock: 10,
          price: 299000, // Giá cho biến thể này
        },
        {
          id: "gx5fCkyJ4O9NLS1fPB-ND",
          sellerSku: "KOGew7MOh4y3gSvf7rmI-",
          name: "Áo thun - thường - L",
          allowSale: true,
          stock: 5,
          price: 579000,
        },
        {
          id: "j5F-wBr9M-kHZ_6lkD8mM",
          sellerSku: "uhZPYuzUywMN_UAiHcjdH",
          name: "Áo thun  - thường - XL",
          allowSale: true,
          stock: 3,
          price: 1099000,
        },
      ],
    },
    first: true,
    last: false,
    pageNumber: 1,
    empty: false,
  },
  success: true,
  timestamp: new Date().toISOString(),
  version: "v1",
};
