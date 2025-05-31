import { Category } from "@/common/type/category/category.type";
import { DataMedia, FormDataAddProduct } from "@/common/type/formAddProduct";
import { Close } from "@mui/icons-material";
import { Button, FormControl, Select } from "@mui/material";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Control, UseFormRegister } from "react-hook-form";
import CategoryMenu from "./category/CategoryMenu";
import UpImageProducts from "./media/UpImageProducts";
import UpSmallImage from "./media/UpSmallImage";
import NoteAddProduct from "./note/NoteAddProduct";

interface BasicInfoSectionProps {
    register: UseFormRegister<FormDataAddProduct>;
    control: Control<FormDataAddProduct>;
    selectedCategories: Category | null;
    setSelectedCategories: (categories: Category) => void;
    selectedImage: DataMedia | null;
    setSelectedImage: (image: DataMedia) => void;
    selectedProductImages: DataMedia[];
    setSelectedProductImages: React.Dispatch<React.SetStateAction<DataMedia[]>>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
    register,
    control,
    selectedCategories,
    setSelectedCategories,
    selectedImage,
    setSelectedImage,
    selectedProductImages,
    setSelectedProductImages,
}) => {
    const [openModalSmallImage, setOpenModalSmallImage] = useState(false);
    const [openModalProductImage, setOpenModalProductImage] = useState(false);

    const handleCategorySelect = (categories: Category) =>
        setSelectedCategories(categories);
    const handleSelectImage = (image: DataMedia) => setSelectedImage(image);
    const handleSelectImageProduct = (images: DataMedia[]) =>
        setSelectedProductImages((prev) => [...prev, ...images]);
    const removeProductImage = (index: number) =>
        setSelectedProductImages((prev) => prev.filter((_, i) => i !== index));

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
                Thông tin cơ bản
            </h2>

            {/* Product Name */}
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    className="w-full rounded-md border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên sản phẩm..."
                    {...register("name", {
                        required: "Tên sản phẩm là bắt buộc",
                    })}
                />
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Danh mục
                </label>
                <FormControl fullWidth>
                    <Select
                        value={selectedCategories?.id || ""}
                        onChange={(e) => {
                            const category = categories.find(
                                (c) => c.id === e.target.value
                            );
                            if (category) handleCategorySelect(category);
                        }}
                        displayEmpty
                        renderValue={(value) =>
                            selectedCategories?.name || "Chọn danh mục..."
                        }
                    >
                        <CategoryMenu onSelectCategory={handleCategorySelect} />
                    </Select>
                </FormControl>
            </div>

            {/* Product Images */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Ảnh sản phẩm{" "}
                    <NoteAddProduct content="Tối đa 8 ảnh, định dạng JPG/PNG." />
                </label>
                <Button
                    variant="outlined"
                    startIcon={<Upload />}
                    onClick={() => setOpenModalProductImage(true)}
                >
                    Tải lên
                </Button>
                <UpImageProducts
                    onSelectProductImage={handleSelectImageProduct}
                    isOpen={openModalProductImage}
                    onClose={() => setOpenModalProductImage(false)}
                />
                <div className="flex space-x-4 overflow-x-auto py-2">
                    {selectedProductImages.map((preview, index) => (
                        <div
                            key={index}
                            className="relative w-24 h-24 flex-shrink-0"
                        >
                            <img
                                src={preview.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-md border"
                            />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                onClick={() => removeProductImage(index)}
                            >
                                <Close fontSize="small" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Small Image */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Hình ảnh quảng cáo{" "}
                    <NoteAddProduct content="Ảnh chính hiển thị trong danh sách sản phẩm." />
                </label>
                <Button
                    variant="outlined"
                    startIcon={<Upload />}
                    onClick={() => setOpenModalSmallImage(true)}
                >
                    Tải lên
                </Button>
                <UpSmallImage
                    onSelectImage={handleSelectImage}
                    isOpen={openModalSmallImage}
                    onClose={() => setOpenModalSmallImage(false)}
                />
                {selectedImage && (
                    <div className="relative w-24 h-24">
                        <img
                            src={selectedImage.url}
                            alt="Small Image"
                            className="w-full h-full object-cover rounded-md border"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BasicInfoSection;
