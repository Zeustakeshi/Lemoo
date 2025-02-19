import { useState, useEffect } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  UseFormSetValue,
  PathValue,
  FieldErrors,
} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

import img from "../../../seller_center/src/assets/images/cccd.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

interface InputFileProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>; // 👈 Thêm errors vào props
  textarray: string[];

  onClear?: () => void;
}

const text = [
  "Tải lên mặt trước CCCD",
  "Giấy tờ đính kèm phải có đủ các mặt, theo định dạnh PNG, JPEG, PDF.",
  "Vui lòng chuẩn bị giấy tờ tùy thân rõ ràng (hô chiếu nếu là người nước ngoài) với thông tin Họ và Tên, Ngày sinh và Ngày hết hạn rõ ràng, không có vật gì che khuất.",
];

const InputFile = <T extends FieldValues>({
  label,
  name,
  register,
  setValue,
  errors,
  textarray,
}: InputFileProps<T>) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Xóa preview cũ nếu có
      if (previewImage) URL.revokeObjectURL(previewImage);

      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFileName(file.name);
      // Sửa lại cách set value
      setValue(name, file as PathValue<T, Path<T>>, { shouldValidate: true });
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
    setFileName("");

    // Xóa giá trị của field tương ứng
    setValue(name, null as unknown as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });

    // Reset input file theo ID động
    const input = document.getElementById(
      `file-upload-${name}`
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleDownloadImage = () => {
    if (previewImage) {
      const a = document.createElement("a");
      a.href = previewImage;
      a.download = fileName || "downloaded-image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex flex-col">

    <div  className={`flex justify-around p-4 rounded-lg ${errors[name] ? "bg-red-300" : "bg-[rgb(243,245,252)]"}`}>
      {/* Div bao ngoài thay đổi màu nền nếu chưa có ảnh */}
      <div
      >
        <label
          htmlFor={`file-upload-${name}`}
          className="relative flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 bg-white overflow-hidden"
        >
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <DeleteIcon fontSize="small" />
              </button>
              <button
                onClick={handleDownloadImage}
                className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
              >
                <DownloadIcon fontSize="small" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 2a4 4 0 00-4-4h-1V8a4 4 0 10-8 0v2h-1a4 4 0 00-4 4v4a2 2 0 002 2h12a2 2 0 002-2v-4z"
                  ></path>
                </svg>
              </div>
              <p className="mt-2 text-gray-600 text-sm">
                Drag or Click to Upload
              </p>
            </div>
          )}
          <input
            id={`file-upload-${name}`}
            type="file"
            accept="image/*"
            className="hidden"
            {...register(name, { required: "Avatar is required" })}
            onChange={handleFileChange}
          />
        </label>

     
      </div>


      <div>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            slidesPerView={1}
            className="relative w-[300px] h-full "
          >
            <SwiperSlide className="w-full">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
        </div>
      {/* Hiển thị lỗi nếu không chọn ảnh */}
    </div>
    {errors[name] && (
        <p className="text-red-500 mt-2">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default InputFile;
