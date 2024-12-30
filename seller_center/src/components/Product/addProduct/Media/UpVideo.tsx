import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

type PropsItem = {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (selectedVideo: DataMedia) => void;
};
type ImageData = {
  id: string;
  url: string;
};

const UpVideo: React.FC<PropsItem> = ({ isOpen, onClose, onSelectImage }) => {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            width: "80%",
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" mb={2}>
            Media
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {data.map((image) => (
              <Box
                key={image.id}
                sx={{ position: "relative", width: "calc(33.33% - 16px)" }}
              >
                <img
                  src={image.url}
                  alt="Uploaded"
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ position: "absolute", bottom: 10, left: 10 }}
                  onClick={() => handleSelectImage(image.id)}
                >
                  Select
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ position: "absolute", bottom: 10, right: 10 }}
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
          {/* Hiển thị các ảnh đã tải lên */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {images.map((image) => (
              <Box
                key={image}
                sx={{ position: "relative", width: "calc(33.33% - 16px)" }}
              >
                <img
                  src={image}
                  alt="Uploaded"
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ position: "absolute", bottom: 10, left: 10 }}
                  onClick={() => handleSelectImage(image)}
                >
                  Select
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ position: "absolute", bottom: 10, right: 10 }}
                  onClick={() => handleDeleteImage(image)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>

          {/* Upload new image */}
          <Box sx={{ marginTop: 2 }}>
            <input
              {...register(`${urlName}.url`)}
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  // Hiển thị preview của ảnh
                  const previewUrl = URL.createObjectURL(file);
                  setNewImage(previewUrl);

                  // Dọn dẹp URL blob để tránh rò rỉ bộ nhớ
                  return () => URL.revokeObjectURL(previewUrl);
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadImage}
              sx={{ marginTop: 2 }}
            >
              Upload Image
            </Button>
          </Box>

          {/* Close button */}
          <Button onClick={onClose} variant="contained" sx={{ marginTop: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpVideo;
