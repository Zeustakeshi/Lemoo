import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import CategoryMenu from "./Category/CategoryMenu";
import Cookies from "js-cookie";
import { Add, ErrorOutlineOutlined, Upload } from "@mui/icons-material";
import {
  DataMedia,
  FormDataAddProduct,
  FormVariants,
  SkusVar,
} from "../../../type/formAddProduct";

import { useState } from "react";
import { Category } from "../../../type/categories";
import NoteAddProduct from "./Note/NoteAddProduct";
import UpSmallImage from "./Media/UpSmallImage";
import axiosInstance from "../../Axios/axiosConfig";

const FormAddProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category>();
  const [selectedImage, setSelectedImage] = useState<DataMedia>();
  const [complete, setComplete] = useState<boolean>(false);
  const handleComplete = () => setComplete(true);

  const [openModalSmallImage, setOpenModalSmallImage] = useState(false);
  const handleOpenModalSmallImage = () => setOpenModalSmallImage(true);
  const handleCloseModalSmallImage = () => setOpenModalSmallImage(false);

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
      const formData = new FormData();

      // Thêm thông tin cơ bản
      formData.append("name", data.name);
      formData.append("description", data.description || "");

      // Thêm danh mục (dạng JSON)

      formData.append("categoryId", selectedCategories?.id || "");
      formData.append("smallImage.mediaId", selectedImage?.mediaId || "");
      formData.append("smallImage.url", selectedImage?.url || "");

      // Thêm Attribute
      data.variants.forEach((variants, index) => {
        // Thêm thông tin của biến thể vào formData
        formData.append(`variants[${index}][name]`, variants.name);
        formData.append(
          `variants[${index}][values]`,
          JSON.stringify(variants.values)
        );
      });
      // tạo một mảng dữ liệu từ attribute ở trên
      const VariantsArray = data.variants.map((variants) => ({
        name: variants.name,
        values: variants.values,
      }));
      console.log(VariantsArray);
      //Covert key-value

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

      const baseSku = {
        name: "",
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
      console.log(generatedVariants);
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
        });
      });

      if (complete) {
        console.log(data);

        // Thêm biến thể
        data.skus.forEach((skus, index) => {
          // Thêm thông tin của biến thể vào formData
          formData.append(`skus[${index}][name]`, skus.name);
          formData.append(`skus[${index}][sellerSku]`, " ");
          formData.append(
            `skus[${index}][allowSale]`,
            skus.allowSale.toString()
          );
          // Nếu có giá đặc biệt, thêm vào
          if (skus.specialPrice) {
            formData.append(
              `skus[${index}][specialPrice]`,
              skus.specialPrice.toString()
            );
          }

          //   // Nếu có thời gian áp dụng giá đặc biệt, thêm vào
          if (skus.specialFromDate) {
            formData.append(
              `skus[${index}][specialFromDate]`,
              skus.specialFromDate
            );
          }
          if (skus.specialToDate) {
            formData.append(
              `skus[${index}][specialToDate]`,
              skus.specialToDate
            );
          }

          //   // Thêm số lượng tồn kho và các thông tin đóng gói
          formData.append(`skus[${index}][stock]`, skus.stock.toString());
          formData.append(
            `skus[${index}][packageWidth]`,
            skus.packageWidth.toString()
          );
          formData.append(
            `skus[${index}][packageHeight]`,
            skus.packageHeight.toString()
          );
          formData.append(
            `skus[${index}][packageLength]`,
            skus.packageLength.toString()
          );
          formData.append(
            `skus[${index}][packageWeight]`,
            skus.packageWeight.toString()
          );
          formData.append(`skus.variants`, JSON.stringify(skus.variants));
        });

        const storeId = Cookies.get("userInfo") || "";
        //Gửi yêu cầu API
        const response = await axiosInstance.post("/products", formData, {
          headers: {
            "X-Store-Id": storeId,
          },
        });

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
            <div className="flex items-center justify-end">
              <button
                className=" rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                onClick={handleComplete}
              >
                Cập nhật chỉnh sửa
              </button>
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

      {complete ? (
        <div className="flex items-center justify-center">
          <button
            className=" rounded-md bg-green-500 text-white px-4 py-2 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            type="submit"
          >
            Tạo Sản Phẩm
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <button
            className=" rounded-md bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500"
            type="submit"
          >
            Lưu
          </button>
        </div>
      )}
    </form>
  );
};

export default FormAddProduct;
