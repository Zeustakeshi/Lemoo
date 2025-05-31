import { FormDataAddProduct } from "@/common/type/formAddProduct";
import { api } from "@/lib/api";
import { Add, ContentCopy, Delete, Refresh } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    Control,
    UseFieldArrayReturn,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import toast from "react-hot-toast";

// Định nghĩa kiểu cho ảnh
type ImageData = {
    id: string;
    url: string;
};

// Định nghĩa kiểu cho API response
type ApiResponse = {
    content: ImageData[];
};

// Component Modal chọn ảnh
type ImageSelectionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelectImage: (selectedImage: { mediaId: string; url: string }) => void;
    storeId: string;
};

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({
    isOpen,
    onClose,
    onSelectImage,
    storeId,
}) => {
    const [images, setImages] = useState<ImageData[]>([]);

    // Lấy danh sách ảnh từ API
    useEffect(() => {
        const getImages = async () => {
            try {
                const res: ApiResponse = await api.get(
                    `/media/stores/${storeId}/images`
                );
                const fetchedImages = Array.isArray(res.content)
                    ? res.content
                    : [];
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
                setImages([]);
                toast.error("Không thể tải danh sách ảnh. Vui lòng thử lại!");
            }
        };

        if (storeId) {
            getImages();
        } else {
            console.warn("Store ID is missing, cannot fetch images.");
            setImages([]);
        }
    }, [storeId]);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="image-selection-modal-title"
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
                    id="image-selection-modal-title"
                    variant="h6"
                    component="h2"
                    mb={2}
                >
                    Chọn ảnh
                </Typography>

                {/* Danh sách ảnh */}
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
                                        onSelectImage({
                                            mediaId: image.id,
                                            url: image.url,
                                        })
                                    }
                                >
                                    Chọn
                                </Button>
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        bottom: 10,
                                        right: 10,
                                        color: "error.main",
                                    }}
                                    onClick={() => {
                                        // Logic xóa ảnh (nếu cần)
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        ))
                    )}
                </Box>

                {/* Nút đóng */}
                <Box textAlign="right" mt={3}>
                    <Button variant="outlined" onClick={onClose}>
                        Đóng
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

// Component VariantsSection
interface VariantsSectionProps {
    control: Control<FormDataAddProduct>;
    setValue: UseFormSetValue<FormDataAddProduct>;
    register: UseFormRegister<FormDataAddProduct>;
    variantsFields: UseFieldArrayReturn<
        FormDataAddProduct,
        "variants"
    >["fields"];
    appendVariants: UseFieldArrayReturn<
        FormDataAddProduct,
        "variants"
    >["append"];
    removeVariants: UseFieldArrayReturn<
        FormDataAddProduct,
        "variants"
    >["remove"];
    skuFields: UseFieldArrayReturn<FormDataAddProduct, "skus">["fields"];
    appendSku: UseFieldArrayReturn<FormDataAddProduct, "skus">["append"];
    removeSku: UseFieldArrayReturn<FormDataAddProduct, "skus">["remove"];
}

const VariantsSection: React.FC<VariantsSectionProps> = ({
    control,
    register,
    variantsFields,
    appendVariants,
    removeVariants,
    skuFields,
    appendSku,
    removeSku,
    setValue,
}) => {
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    const storeId =
        JSON.parse(sessionStorage.getItem("storeInfo") || "{}").id || "";

    // Helper function to generate SKU combinations from variants
    const generateSkus = (variants: { name: string; values: string[] }[]) => {
        const isValidVariants = variants.every(
            (variant) => variant.name && variant.values.length > 0
        );

        if (!isValidVariants) {
            toast.error("Vui lòng nhập đầy đủ tên và giá trị biến thể!");
            return [];
        }

        const baseSku = {
            name: "",
            image: { mediaId: "", url: "" },
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

        const skusResult: any[] = [];

        function backtrack(
            currentIndex: number,
            currentVariants: Record<string, string>
        ) {
            if (currentIndex === variants.length) {
                const newVariant = {
                    ...baseSku,
                    variants: { ...currentVariants },
                    name: Object.values(currentVariants).join(" - "),
                };
                skusResult.push(newVariant);
                return;
            }

            const { name, values } = variants[currentIndex];
            for (const value of values) {
                currentVariants[name] = value;
                backtrack(currentIndex + 1, currentVariants);
                delete currentVariants[name];
            }
        }

        backtrack(0, {});
        return skusResult;
    };

    // Handle generating the SKU list
    const handleGenerateSkus = () => {
        const formValues = control._formValues as FormDataAddProduct;
        const variants = formValues.variants || [];

        const generatedSkus = generateSkus(variants);

        if (generatedSkus.length === 0) return;

        removeSku();
        generatedSkus.forEach((sku) => {
            appendSku({
                name: sku.name,
                sellerSku: sku.sellerSku,
                allowSale: sku.allowSale,
                price: sku.price,
                stock: sku.stock,
                packageHeight: sku.packageHeight,
                packageLength: sku.packageLength,
                packageWeight: sku.packageWeight,
                packageWidth: sku.packageWidth,
                variants: sku.variants,
                image: sku.image,
            });
        });

        toast.success("Đã tạo danh sách biến thể thành công!");
    };

    // Hàm sao chép giá trị từ hàng trước
    const copyPreviousValues = (index: number) => {
        if (index === 0) return; // Không có hàng trước để sao chép
        const previousValues = control._formValues.skus[index - 1];
        setValue(`skus.${index}.price`, previousValues.price);
        setValue(`skus.${index}.stock`, previousValues.stock);
        setValue(`skus.${index}.packageWidth`, previousValues.packageWidth);
        setValue(`skus.${index}.packageHeight`, previousValues.packageHeight);
        setValue(`skus.${index}.packageLength`, previousValues.packageLength);
        setValue(`skus.${index}.packageWeight`, previousValues.packageWeight);
        toast.success("Đã sao chép giá trị từ hàng trước!");
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
                Giá bán, Kho hàng và Biến thể
            </h2>
            <p className="text-sm text-gray-500">
                Tạo biến thể nếu sản phẩm có hơn một tùy chọn (ví dụ: màu sắc,
                kích thước).
            </p>

            {/* Variant Groups */}
            <div className="space-y-4">
                <div className="flex space-x-2">
                    <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => appendVariants({ name: "", values: [] })}
                    >
                        Thêm biến thể
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Refresh />}
                        onClick={handleGenerateSkus}
                        disabled={variantsFields.length === 0}
                    >
                        Tạo danh sách biến thể
                    </Button>
                </div>
                {variantsFields.map((field, index) => (
                    <div
                        key={field.id}
                        className="border p-4 rounded-md space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">
                                Biến thể {index + 1}
                            </h4>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => removeVariants(index)}
                            >
                                Xóa
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tên biến thể
                                </label>
                                <input
                                    placeholder="Ví dụ: Màu sắc"
                                    className="w-full rounded-md border-gray-300 p-2 mt-1"
                                    {...register(`variants.${index}.name`, {
                                        required: "Tên biến thể là bắt buộc",
                                    })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Giá trị (cách nhau bằng dấu phẩy)
                                </label>
                                <input
                                    placeholder="Ví dụ: Đỏ, Xanh"
                                    className="w-full rounded-md border-gray-300 p-2 mt-1"
                                    {...register(`variants.${index}.values`, {
                                        required:
                                            "Giá trị biến thể là bắt buộc",
                                        setValueAs: (value: string) =>
                                            (typeof value === "string" &&
                                                value
                                                    ?.split(",")
                                                    .map((v: string) =>
                                                        v.trim()
                                                    )
                                                    .filter(
                                                        (v: string) => v
                                                    )) ||
                                            [],
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SKU List */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                    Danh sách biến thể
                </h3>
                {skuFields.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                        Chưa có biến thể nào. Nhấn "Tạo danh sách biến thể" để
                        bắt đầu.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {skuFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-4"
                            >
                                {/* Tiêu đề và nút xóa */}
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Biến thể:{" "}
                                        {control._formValues.skus[index]
                                            ?.name || "Chưa có tên"}
                                    </h4>
                                    <div className="flex space-x-2">
                                        {index > 0 && (
                                            <Tooltip title="Sao chép giá trị từ hàng trước">
                                                <IconButton
                                                    onClick={() =>
                                                        copyPreviousValues(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <ContentCopy fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            startIcon={<Delete />}
                                            onClick={() => removeSku(index)}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>

                                {/* Grid layout cho các trường nhập liệu */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Tên biến thể */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tên biến thể
                                        </label>
                                        <input
                                            className="w-full rounded-md border-gray-300 p-2 mt-1"
                                            {...register(`skus.${index}.name`)}
                                            disabled
                                        />
                                    </div>

                                    {/* Seller SKU */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Mã SKU
                                        </label>
                                        <input
                                            placeholder="Nhập mã SKU (tùy chọn)"
                                            className="w-full rounded-md border-gray-300 p-2 mt-1"
                                            {...register(
                                                `skus.${index}.sellerSku`
                                            )}
                                        />
                                    </div>

                                    {/* Hình ảnh */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Hình ảnh
                                        </label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() =>
                                                    setOpenModalIndex(index)
                                                }
                                            >
                                                Chọn ảnh
                                            </Button>
                                            {control._formValues.skus[index]
                                                ?.image?.url && (
                                                <div className="relative">
                                                    <img
                                                        src={
                                                            control._formValues
                                                                .skus[index]
                                                                .image.url
                                                        }
                                                        alt="SKU"
                                                        className="w-12 h-12 object-cover rounded-md"
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                                                        onClick={() =>
                                                            (control._formValues[
                                                                `skus.${index}.image`
                                                            ] = {
                                                                mediaId: "",
                                                                url: "",
                                                            })
                                                        }
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            )}
                                            <ImageSelectionModal
                                                isOpen={
                                                    openModalIndex === index
                                                }
                                                onClose={() =>
                                                    setOpenModalIndex(null)
                                                }
                                                onSelectImage={(
                                                    selectedImage
                                                ) => {
                                                    setValue(
                                                        `skus.${index}.image`,
                                                        selectedImage
                                                    );
                                                    setOpenModalIndex(null);
                                                }}
                                                storeId={storeId}
                                            />
                                        </div>
                                    </div>

                                    {/* Giá */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Giá (VNĐ)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Nhập giá bán"
                                            className="w-full rounded-md border-gray-300 p-2 mt-1"
                                            {...register(
                                                `skus.${index}.price`,
                                                {
                                                    valueAsNumber: true,
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Giá không được âm",
                                                    },
                                                }
                                            )}
                                        />
                                    </div>

                                    {/* Tồn kho */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tồn kho
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Nhập số lượng tồn kho"
                                            className="w-full rounded-md border-gray-300 p-2 mt-1"
                                            {...register(
                                                `skus.${index}.stock`,
                                                {
                                                    valueAsNumber: true,
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Tồn kho không được âm",
                                                    },
                                                }
                                            )}
                                        />
                                    </div>

                                    {/* Kích thước gói */}
                                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Kích thước gói (cm, kg)
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                                            <input
                                                placeholder="Rộng (cm)"
                                                type="number"
                                                className="rounded-md border-gray-300 p-2"
                                                {...register(
                                                    `skus.${index}.packageWidth`,
                                                    {
                                                        valueAsNumber: true,
                                                        min: {
                                                            value: 0,
                                                            message:
                                                                "Kích thước không được âm",
                                                        },
                                                    }
                                                )}
                                            />
                                            <input
                                                placeholder="Cao (cm)"
                                                type="number"
                                                className="rounded-md border-gray-300 p-2"
                                                {...register(
                                                    `skus.${index}.packageHeight`,
                                                    {
                                                        valueAsNumber: true,
                                                        min: {
                                                            value: 0,
                                                            message:
                                                                "Kích thước không được âm",
                                                        },
                                                    }
                                                )}
                                            />
                                            <input
                                                placeholder="Dài (cm)"
                                                type="number"
                                                className="rounded-md border-gray-300 p-2"
                                                {...register(
                                                    `skus.${index}.packageLength`,
                                                    {
                                                        valueAsNumber: true,
                                                        min: {
                                                            value: 0,
                                                            message:
                                                                "Kích thước không được âm",
                                                        },
                                                    }
                                                )}
                                            />
                                            <input
                                                placeholder="Nặng (kg)"
                                                type="number"
                                                className="rounded-md border-gray-300 p-2"
                                                {...register(
                                                    `skus.${index}.packageWeight`,
                                                    {
                                                        valueAsNumber: true,
                                                        min: {
                                                            value: 0,
                                                            message:
                                                                "Trọng lượng không được âm",
                                                        },
                                                    }
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VariantsSection;
