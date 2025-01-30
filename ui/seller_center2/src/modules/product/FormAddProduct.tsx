import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Add, ErrorOutlineOutlined, Upload } from "@mui/icons-material";

import { useState } from "react";

import { Category } from "../../common/type/category/category.type";
import {
  DataMedia,
  FormDataAddProduct,
  FormVariants,
  SkusVar,
} from "../../common/type/formAddProduct";
import axiosInstance from "../../helpers/axios/axiosInstance";
import CategoryMenu from "./category/CategoryMenu";
import NoteAddProduct from "./note/NoteAddProduct";
import UpImageProducts from "./media/UpImageProducts";
import UpSmallImage from "./media/UpSmallImage";
import { FileInput } from "../../helpers/utils/UploadFile/FileInput";

const FormAddProduct = () => {
  const storeId = JSON.parse(sessionStorage.getItem("StoreId") || "{}");
  console.log("id cửa hàng: ", storeId);
  const [selectedCategories, setSelectedCategories] = useState<Category>();
  const [selectedImage, setSelectedImage] = useState<DataMedia>();
  const [selectedProductImage, setSelectedProductImage] = useState<DataMedia[]>(
    []
  );
  const [complete, setComplete] = useState<boolean>(true);
  const [isSave, setIsSave] = useState<boolean>(false);
  const handleComplete = () => setComplete(true);
  const handleSave = () => {
    setComplete(false);
    setIsSave(true);
  };

  const getStore = async () => {
    try {
      const getStore = await axiosInstance.get("/products/store", {
        headers: {
          "X-store-Id": storeId,
        },
      });
      console.log("Tất cả sản phẩm của cửa hàng: ", getStore.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [openModalSmallImage, setOpenModalSmallImage] = useState(false);
  const handleOpenModalSmallImage = () => setOpenModalSmallImage(true);
  const handleCloseModalSmallImage = () => setOpenModalSmallImage(false);

  const [openModalProductImage, setOpenModalProductImage] = useState(false);
  const handleOpenModalProductImage = () => setOpenModalProductImage(true);
  const handleCloseModalProductImage = () => setOpenModalProductImage(false);

  const { control, handleSubmit, register } = useForm<FormDataAddProduct>({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      smallImage: {
        mediaId: "",
        url: "",
      },
      video: {
        mediaId: "",
        url: "",
      },
      images: [
        {
          mediaId: "",
          url: "",
        },
      ],
      variants: [{ name: "", values: [""] }],
    },
  });

  const handleCategorySelect = (categories: Category) => {
    setSelectedCategories(categories);
  };

  const handleSelectImage = (Image: DataMedia) => {
    setSelectedImage(Image);
  };

  // nhận dữ liệu mới và cập nhật thêm phần tử qua CallBack
  const handleSelectImageProduct = (selectedProductImage: DataMedia[]) => {
    setSelectedProductImage((prev) => [...prev, ...selectedProductImage]);
  };

  /**Dyamic form */
  const {
    fields: variantsFields,
    append: appendVariants,
    remove: removeVariants,
  } = useFieldArray({
    control,
    name: "variants", //Tên mảng attributes
  });

  const {
    fields: SkuFields,
    append: appendSku,
    remove: removeSku,
  } = useFieldArray({
    control,
    name: "skus", // Tên mảng variants
  });

  const onSubmit = async (data: FormDataAddProduct) => {
    try {
      // tạo một mảng dữ liệu từ attribute ở trên
      const VariantsArray = data.variants.map((variants) => ({
        name: variants.name,
        values: variants.values,
      }));
      // Kiểm tra nếu `VariantsArray` chứa dữ liệu hợp lệ
      const isValidVariants = VariantsArray.some(
        (variant) => variant.name && variant.values.length > 0
      );

      if (!isValidVariants) {
        alert("Biến thể không được trống, hãy nhập lại.");
        setComplete(true);
        setIsSave(false);
        return; // Kết thúc hàm nếu mảng không hợp lệ
      }
      const result = VariantsArray.reduce<FormVariants[]>((acc, curr) => {
        // Nếu curr.values là chuỗi, chuyển nó thành mảng
        const values =
          typeof curr.values === "string" ? [curr.values] : curr.values;

        const existing = acc.find((item) => item.name === curr.name);
        if (existing) {
          existing.values.push(...values);
        } else {
          acc.push({ name: curr.name, values: [...values] });
        }
        return acc;
      }, []);
      //Covert key-value
      if (complete == false) {
        const baseSku = {
          name: "",
          image: {} as DataMedia,
          sellerSku: "",
          allowSale: true,
          price: 0,
          specialPrice: 0,
          specialFromDate: "",
          specialToDate: "",
          stock: 0,
          packageWidth: 0,
          packageHeight: 0,
          packageLength: 0,
          packageWeight: 0,
          variants: {},
        };

        // Tạo variant từ attribute
        function generateVariants(result: FormVariants[]) {
          const SkusResult: SkusVar[] = [];

          function backtrack(
            currentIndex: number,
            currentVariants: Record<string, string>
          ) {
            if (currentIndex === result.length) {
              const newVariant: SkusVar = {
                ...baseSku,
                variants: { ...currentVariants },
                name: Object.values(currentVariants).join(" - "), // Tạo tên từ giá trị attributes
              };
              SkusResult.push(newVariant);
              return;
            }

            const { name, values } = result[currentIndex];
            for (const value of values) {
              currentVariants[name] = value; // Thêm thuộc tính vào variant
              backtrack(currentIndex + 1, currentVariants);
              delete currentVariants[name]; // Xóa thuộc tính khi quay lui
            }
          }

          backtrack(0, {});
          return SkusResult;
        }

        const generatedVariants = generateVariants(result);
        generatedVariants.forEach((item) => {
          appendSku({
            name: item.name,
            sellerSku: item.sellerSku,
            allowSale: item.allowSale,
            price: item.price,
            stock: item.stock,
            packageHeight: item.packageHeight,
            packageLength: item.packageLength,
            packageWeight: item.packageWeight,
            packageWidth: item.packageWidth,
            variants: item.variants,
            image: {
              mediaId: "",
              url: "",
            },
          });
        });
      }

      if (complete && VariantsArray.length != 1) {
        data.categoryId = selectedCategories?.id || "";
        data.smallImage.mediaId = selectedImage?.mediaId || "";
        data.smallImage.url = selectedImage?.url || "";
        data.images = selectedProductImage;
        data.variants = result;
        //Gửi yêu cầu API
        const response = await axiosInstance.post(
          "/products/store",
          JSON.stringify(data),
          {
            headers: {
              "Content-Type": "application/json",
              "X-store-Id": storeId,
            },
          }
        );

        // Xử lý phản hồi thành công
        return response.data;
      }
    } catch (error) {
      // Xử lý lỗi
      console.error("Error adding product:", error);
      throw error;
    }
  };

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="m-2 text-2xl font-semibold">
        <h1>Thêm Sản Phẩm</h1>
      </div>
      {/* Tên sản phẩm */}
      <div className="border bg-slate-100 rounded-lg min-h-[200px]  w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
        <div className="m-2">
          <h2 className="font-medium text-xl ">Thông tin cơ bản</h2>
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            className=" w-full sm:w-3/4 lg:w-2/3 border-2 border-gray-400 rounded-lg p-2"
            type="text"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <FormControl sx={{ width: 830 }}>
            <InputLabel id="demo-multiple-name-label">Danh Mục</InputLabel>
            <Select input={<OutlinedInput label="Danh Mục" />}>
              <CategoryMenu onSelectCategory={handleCategorySelect} />
            </Select>
          </FormControl>
        </div>
        <div className="p-1 flex items-center space-x-2">
          <span className="font-semibold text-gray-500">Danh mục: </span>
          <span className="  bg-gray-200 px-4 rounded-lg">
            {selectedCategories?.name ?? "....."}
          </span>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="m-1 flex items-center space-x-2">
            <label>Ảnh sản phẩm</label>
            <NoteAddProduct
              content="1. Đây là hình ảnh chính trên trang sản phẩm. Bạn có thể up nhiều hình ảnh cùng lúc và tối đa có thể có 8 hình.
2. Hình ảnh cần có kích thước từ 330x300 px đến 5000x5000px và không dược phép chứa nội dung nhạy cảm.
3. Kích thước tối đa: 3 MB"
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleOpenModalProductImage}>
              Tải Lên <Upload fontSize="small" />
            </Button>
            <UpImageProducts
              onSelectProductImage={handleSelectImageProduct}
              isOpen={openModalProductImage}
              onClose={handleCloseModalProductImage}
            />
          </div>
          {/* Hiển thị preview ảnh */}
          <div className="flex items-center space-x-4">
            {selectedProductImage.map((preview, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="m-1 flex items-center space-x-2">
            <label>Hình ảnh quảng cáo cho người mua</label>
            <NoteAddProduct
              content="1. Ảnh thu nhỏ sẽ được dùng để hiển thị sản phẩm của bạn ở một số nơi như trang kết quả tìm kiếm, trang gợi ý sản phẩm, vv...
2. Ảnh thu nhỏ giúp thu hút người dùng nhấp vào sản phẩm của bạn."
            />
            <span className=" text-sm px-2 py-1 rounded-xl text-[#1371ff] bg-blue-100 ">
              Tiếp xúc nhiều hơn
            </span>
          </div>
          {/* Hiển thị preview ảnh */}
          <div className="grid grid-cols-4 gap-4">
            {selectedImage && (
              <div className="relative w-24 h-24">
                <img
                  src={selectedImage.url}
                  alt="small img"
                  className="w-full h-full object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div>
            <Button variant="contained" onClick={handleOpenModalSmallImage}>
              Tải Lên <Upload fontSize="small" />
            </Button>
            <UpSmallImage
              onSelectImage={handleSelectImage}
              isOpen={openModalSmallImage}
              onClose={handleCloseModalSmallImage}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="m-1 flex items-center space-x-2">
            <label>Video</label>
            <NoteAddProduct
              content="1. Ảnh thu nhỏ sẽ được dùng để hiển thị sản phẩm của bạn ở một số nơi như trang kết quả tìm kiếm, trang gợi ý sản phẩm, vv...
2. Ảnh thu nhỏ giúp thu hút người dùng nhấp vào sản phẩm của bạn."
            />
          </div>
        </div>
      </div>

      {/* Biến thể */}
      <div className="border bg-slate-100 rounded-lg min-h-[200px] w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
        <div className="m-2">
          <h2 className="font-medium text-xl">Giá bán, Kho hàng và Biến thể</h2>
          <span className=" text-gray-400 text-sm">
            Tạo biến thể nếu sản phẩm có hơn một tùy chọn, ví dụ như về kích
            thước hay màu sắc.
          </span>
        </div>
        <div className="m-1 flex items-center space-x-2">
          <label htmlFor="name">Biến thể</label>
          <div className="relative group">
            <ErrorOutlineOutlined sx={{ color: "gray", fontSize: "20px" }} />
            <div className="absolute left-0 bottom-full mt-2 w-64 p-4 bg-gray-100 text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p className="text-sm text-gray-500 font-normal leading-relaxed text-justify max-w-lg:">
                <div className="flex flex-col space-y-2">
                  <span>
                    <span className="font-semibold text-black">Ví Dụ:</span> (
                    Thêm biến thể )
                  </span>
                  <span>Màu Sắc - Đỏ</span>
                  <span>Màu Sắc - Vàng</span>
                  <span>Size - L</span>
                  <span>Size - M</span>
                  <span>....</span>
                </div>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {/* Attribute */}
          <div className="flex flex-col space-y-4">
            <div>
              <button
                className="border px-6 py-2 rounded-lg flex justify-center items-center hover:border-black"
                type="button"
                onClick={() =>
                  appendVariants({
                    name: "",
                    values: [],
                  })
                }
              >
                <Add fontSize="small" />
                <span>Thêm biến thể</span>
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              {variantsFields.map((field, index) => (
                <div
                  className="flex space-x-4"
                  key={field.id}
                  style={{ marginBottom: "1rem" }}
                >
                  <input
                    type="text"
                    placeholder="Tên biến thể"
                    {...register(`variants.${index}.name`)}
                    className="placeholder:text-gray-400 placeholder:p-2"
                  />

                  <input
                    type="text"
                    placeholder="Giá trị biến thể"
                    {...register(`variants.${index}.values`)}
                    className="placeholder:text-gray-400 placeholder:p-2"
                  />

                  <div>
                    <button
                      className="border px-4 p-1 rounded-lg text-slate-100 bg-red-400"
                      type="button"
                      onClick={() => removeVariants(index)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Sku */}

          <div className="flex flex-col space-y-4">
            <div className="m-1 flex items-center space-x-2">
              <label>Các Biến Thể Của Sản Phẩm</label>
              {/* <NoteAddProduct content="Sau khi thêm các biến thể thì nó sẽ được hiển thị tại đây, bạn có thể thêm một số giá trị cần thiết cho từng biến thể." /> */}
            </div>
            <div className="space-y-4">
              {SkuFields.map((field, index) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  key={field.id}
                >
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên biến thể
                    </label>
                    <input
                      type="text"
                      placeholder="Tên biến thể"
                      {...register(`skus.${index}.name`)}
                      className="w-full rounded-md border-gray-300 p-2 text-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      placeholder="Sku"
                      {...register(`skus.${index}.sellerSku`)}
                      className="w-full rounded-md border-gray-300 p-2 text-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cho phép bán
                    </label>
                    <select
                      {...register(`skus.${index}.allowSale`)}
                      defaultValue="false"
                      className="w-full rounded-md border-gray-300 p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="true">Có</option>
                      <option value="false">Không</option>
                    </select>
                  </div>
                  {/* Các trường khác như Giá, Giá đặc biệt, Ngày, Kích thước gói, v.v. */}
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá
                    </label>
                    <input
                      type="number"
                      placeholder="Giá"
                      {...register(`skus.${index}.price`)}
                      className="w-full rounded-md border-gray-300 p-2 text-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hình ảnh
                    </label>
                    <Controller
                      name={`skus.${index}.image`}
                      control={control}
                      render={({ field }) => (
                        <FileInput
                          maxFiles={1} // Tùy chỉnh số lượng file tối đa
                          onFileUpload={async (files) => {
                            // Gọi API để upload hình ảnh
                            try {
                              const formData = new FormData();
                              formData.append("image", files[0]); // Thêm file vào formData

                              const response = await axiosInstance.post(
                                `/media/stores/${storeId}/images`, // API upload ảnh
                                formData
                              );

                              // Lấy kết quả trả về từ API (id và url hình ảnh)
                              const { id, url } = response.data.data;

                              // Cập nhật giá trị vào react-hook-form
                              field.onChange({
                                id,
                                url,
                              });
                            } catch (error) {
                              console.error("Lỗi khi upload hình ảnh:", error);
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                  {/* Trường nút xóa */}
                  <div className="col-span-full md:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeSku(index)}
                      className="rounded-md bg-red-500 text-white px-4 py-2 hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      <div className="border bg-slate-100 rounded-lg min-h-[200px]  w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
        <div className="m-2">
          <h2 className="font-medium text-xl">Mô tả sản phẩm</h2>
        </div>
        <div>
          <span className=" text-gray-400 text-sm">Mô tả chính</span>
          <textarea
            placeholder="Nhập mô tả sản phẩm tại đây..."
            className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            // {...register("name")}
            {...register("description")}
          ></textarea>
        </div>
      </div>

      {complete && !isSave ? (
        <div className="flex items-center justify-center">
          <button
            className=" rounded-md bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500"
            type="submit"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <button
            className=" rounded-md bg-green-500 text-white px-4 py-2 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            type="submit"
            onClick={handleComplete}
          >
            Tạo Sản Phẩm
          </button>
        </div>
      )}
      <button onClick={getStore}>lấy sản phẩm</button>
    </form>
  );
};

export default FormAddProduct;
