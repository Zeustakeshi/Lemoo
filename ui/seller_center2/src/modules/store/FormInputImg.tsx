import React, { useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import img from "../../../../seller_center/src/assets/images/cccd.png";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

interface TitleTextProps {
  text1: string;
  text2: string;
  text3: string;
}

const FormInputImg: React.FC<TitleTextProps> = ({ text1, text2, text3 }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`flex justify-between gap-4 p-3 rounded-xl w-full ${
        image ? "bg-[rgb(239,241,249)]" : "bg-red-200"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          hidden
        />
        <p className="text-sm" >{text1}</p>
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            width: 170,
            height: 170,
            border: "2px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: image
              ? `url(${image}) center center / cover no-repeat`
              : "#f0f0f0",
            position: "relative",
            cursor: "pointer",
            borderRadius: "12px",
          }}
        >
          <div className="flex flex-col items-center w-28 h-28">
            {!image && (
              <Typography variant="body2" color="textSecondary">
                Chưa có ảnh
              </Typography>
            )}
            {!image && (
              <IconButton sx={{ color: "gray" }}>
                <CloudUploadIcon style={{ fontSize: "80px" }} />
              </IconButton>
            )}
          </div>
          {image && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteImage();
              }}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </div>

      <div className="flex flex-col items-center">
        <p className="max-w-[300px] text-blue-500">{text2}</p>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          slidesPerView={1}
          className="relative w-[300px] h-full"
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

      <div className="w-[30%]">
        <p className="text-gray-500">{text3}</p>
      </div>
    </div>
  );
};

export default FormInputImg;
