import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Axios/axiosConfig";
import { DataMedia } from "../../../../type/formAddProduct";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";

type PropsItem = {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (selectedImage: DataMedia) => void;
};

type ImageData = {
  id: string;
  url: string;
};

const UpSmallImage: React.FC<PropsItem> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [newImage, setNewImage] = useState<ImageData>();

  useEffect(() => {
    const getImages = async () => {
      const res = await axiosInstance.get(`/media/stores/abc123/images`);
      setImages(res.data.data.content);
    };
    getImages();
  }, []);

  const handleUploadImage = async () => {
    if (newImage) {
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      await axiosInstance.post(`/media/stores/abc123/images`, newImage);
      setNewImage(undefined);
    }
  };

  const handleDeleteImage = async (imageId: string, imageName: string) => {
    setImages(images.filter((img) => img.url !== imageName));
    await axiosInstance.delete(
      `https://mock.apidog.com/m1/730971-0-default/media/stores/abc123/images/${imageId}`
    );
  };

  const handleSelectImage = (id: string, url: string) => {
    const ImgData: DataMedia = {
      mediaId: id,
      url: url,
    };
    onSelectImage(ImgData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="media-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="media-modal-title" variant="h6" component="h2" mb={2}>
          Media
        </Typography>

        {/* Image Grid */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          sx={{
            overflowY: "auto", // Chỉ cuộn dọc
            maxHeight: "300px", // Đặt chiều cao tối đa
            paddingRight: "8px", // Thêm padding để tránh tràn khi cuộn
          }}
        >
          {images.map((image) => (
            <Box
              key={image.id}
              sx={{
                position: "relative",
                width: "30%",
                maxWidth: "180px",
                height: "150px",
                borderRadius: 1,
                overflow: "auto",
                border: "1px solid #ccc",
              }}
            >
              <img
                src={image.url}
                alt="Uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Button
                size="small"
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  fontSize: "0.8rem",
                }}
                onClick={() => handleSelectImage(image.id, image.url)}
              >
                Select
              </Button>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  color: "error.main",
                }}
                onClick={() => handleDeleteImage(image.id, image.url)}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* Upload Section */}
        <Box mt={3}>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const previewUrl = URL.createObjectURL(file);
                setNewImage({ id: crypto.randomUUID(), url: previewUrl });
                return () => URL.revokeObjectURL(previewUrl);
              }
            }}
            style={{ display: "block", marginBottom: "8px" }}
          />
          <Button
            variant="contained"
            startIcon={<Upload />}
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>
        </Box>

        {/* Close Button */}
        <Box textAlign="right" mt={3}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpSmallImage;
