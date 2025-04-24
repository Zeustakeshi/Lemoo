import { Delete, Upload } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DataMedia } from "../../../common/type/formAddProduct";
import { api } from "../../../lib/api";

// Define the type for the image data
type ImageData = {
    id: string;
    url: string;
    file?: File; // `file` is optional since it's only used during upload
};

// Define the expected API response type
type ApiResponse = {
    content: ImageData[];
};

// Props type
type PropsItem = {
    isOpen: boolean;
    onClose: () => void;
    onSelectImage: (selectedImage: DataMedia) => void;
};

const UpSmallImage: React.FC<PropsItem> = ({
    isOpen,
    onClose,
    onSelectImage,
}) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [newImage, setNewImage] = useState<ImageData | undefined>(undefined);
    const store = JSON.parse(sessionStorage.getItem("storeInfo") || "{}");
    const storeId = store.id || ""; // Ensure storeId is a string, default to empty if undefined

    // Fetch images on component mount
    useEffect(() => {
        const getImages = async () => {
            try {
                const res: ApiResponse = await api.get(
                    `/media/stores/${storeId}/images`
                );
                // Ensure res.content is an array, default to empty array if not
                const fetchedImages = Array.isArray(res.content)
                    ? res.content
                    : [];
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
                setImages([]); // Default to empty array on error
            }
        };

        if (storeId) {
            getImages();
        } else {
            console.warn("Store ID is missing, cannot fetch images.");
            setImages([]); // Default to empty array if storeId is missing
        }
    }, [storeId]);

    // Handle image upload
    const handleUploadImage = async () => {
        if (!newImage) return; // Exit if no new image is selected

        try {
            const formData = new FormData();
            formData.append("image", newImage.file!); // `file` is guaranteed to exist if `newImage` exists

            const res = await api.post(
                `/media/stores/${storeId}/images`,
                formData
            );
            const uploadedImage: ImageData = res; // Adjust based on actual API response structure

            // Ensure `uploadedImage` has the correct shape
            if (uploadedImage && uploadedImage.id && uploadedImage.url) {
                setImages((prevImages) => [...prevImages, uploadedImage]);
                setNewImage(undefined); // Clear the new image after upload
            } else {
                console.error("Invalid image data from API:", uploadedImage);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // Handle image deletion
    const handleDeleteImage = async (imageId: string, imageUrl: string) => {
        try {
            await api.delete(`/media/stores/${storeId}/images/${imageId}`);
            setImages((prevImages) =>
                prevImages.filter((img) => img.url !== imageUrl)
            );
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    // Handle image selection
    const handleSelectImage = (id: string, url: string) => {
        const ImgData: DataMedia = {
            mediaId: id,
            url: url,
        };
        onSelectImage(ImgData);
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="media-modal-title"
        >
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
                <Typography
                    id="media-modal-title"
                    variant="h6"
                    component="h2"
                    mb={2}
                >
                    Media
                </Typography>

                {/* Image Grid */}
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                    sx={{
                        overflowY: "auto",
                        maxHeight: "300px",
                        paddingRight: "8px",
                    }}
                >
                    {images.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">
                            Không có ảnh nào để hiển thị.
                        </Typography>
                    ) : (
                        images.map((image) => (
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
                                    onClick={() =>
                                        handleSelectImage(image.id, image.url)
                                    }
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
                                    onClick={() =>
                                        handleDeleteImage(image.id, image.url)
                                    }
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        ))
                    )}
                </Box>

                {/* Upload Section */}
                <Box mt={3}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                const previewUrl = URL.createObjectURL(file);
                                setNewImage({
                                    id: uuidv4(),
                                    file,
                                    url: previewUrl,
                                });
                                // Clean up the object URL when the component unmounts or on new file selection
                                return () => URL.revokeObjectURL(previewUrl);
                            }
                        }}
                        style={{ display: "block", marginBottom: "8px" }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<Upload />}
                        onClick={handleUploadImage}
                        disabled={!newImage} // Disable the button if no image is selected
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
