import { Category } from "@/common/type/category/category.type";
import { DataMedia, FormDataAddProduct } from "@/common/type/formAddProduct";
import { Upload } from "@mui/icons-material";
import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Select,
} from "@mui/material";
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

/**
 * Component BasicInfoSection
 * Component chứa các thông tin cơ bản của sản phẩm, bao gồm tên sản phẩm, danh mục, ảnh sản phẩm và ảnh quảng cáo.
 */
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
    // State để quản lý trạng thái hiển thị của modal tải ảnh nhỏ
    const [openModalSmallImage, setOpenModalSmallImage] =
        useState<boolean>(false);
    // State để quản lý trạng thái hiển thị của modal tải ảnh sản phẩm
    const [openModalProductImage, setOpenModalProductImage] =
        useState<boolean>(false);

    /**
     * Hàm xử lý khi người dùng chọn một danh mục.
     * @param categories - Danh mục được chọn.
     * @returns {void}
     */
    const handleCategorySelect = (categories: Category): void =>
        setSelectedCategories(categories);
    /**
     * Hàm xử lý khi người dùng chọn một ảnh quảng cáo.
     * @param image - Ảnh quảng cáo được chọn.
     * @returns {void}
     */
    const handleSelectImage = (image: DataMedia): void =>
        setSelectedImage(image);
    /**
     * Hàm xử lý khi người dùng chọn một hoặc nhiều ảnh sản phẩm.
     * @param images - Mảng các ảnh sản phẩm được chọn.
     * @returns {void}
     */
    const handleSelectImageProduct = (images: DataMedia[]): void =>
        setSelectedProductImages((prev) => [...prev, ...images]);

    return (
        <div className="border bg-slate-100 rounded-lg min-h-[200px] w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
            {/* Tiêu đề của section */}
            <div className="m-2">
                <h2 className="font-medium text-xl">Thông tin cơ bản</h2>
            </div>
            {/* Trường nhập tên sản phẩm */}
            <div className="flex flex-col space-y-3">
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                    className="w-full sm:w-3/4 lg:w-2/3 border-2 border-gray-400 rounded-lg p-2"
                    type="text"
                    id="name"
                    {...register("name")}
                />
            </div>
            {/* Select danh mục sản phẩm */}
            <FormControl sx={{ width: 830 }}>
                <InputLabel>Danh Mục</InputLabel>
                <Select input={<OutlinedInput label="Danh Mục" />}>
                    {/* Menu danh mục, cho phép người dùng chọn danh mục */}
                    <CategoryMenu onSelectCategory={handleCategorySelect} />
                </Select>
            </FormControl>
            {/* Hiển thị danh mục đã chọn */}
            <div className="p-1 flex items-center space-x-2">
                <span className="font-semibold text-gray-500">Danh mục: </span>
                <span className="bg-gray-200 px-4 rounded-lg">
                    {selectedCategories?.name ?? "....."}
                </span>
            </div>
            {/* Ảnh sản phẩm */}
            <div className="flex flex-col space-y-3">
                <div className="m-1 flex items-center space-x-2">
                    <label>Ảnh sản phẩm</label>
                    {/* NoteAddProduct là một component hiển thị ghi chú hoặc hướng dẫn */}
                    <NoteAddProduct content="..." />
                </div>
                {/* Button để mở modal tải ảnh sản phẩm */}
                <Button
                    variant="contained"
                    onClick={() => setOpenModalProductImage(true)}
                >
                    Tải Lên <Upload fontSize="small" />
                </Button>
                {/* Modal tải ảnh sản phẩm */}
                <UpImageProducts
                    onSelectProductImage={handleSelectImageProduct}
                    isOpen={openModalProductImage}
                    onClose={() => setOpenModalProductImage(false)}
                />
                {/* Hiển thị ảnh sản phẩm đã chọn */}
                <div className="flex items-center space-x-4">
                    {selectedProductImages.map((preview, index) => (
                        <div key={index} className="relative w-24 h-24">
                            <img
                                src={preview.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg border"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Ảnh quảng cáo */}
            <div className="flex flex-col space-y-3"></div>
            <div className="m-1 flex items-center space-x-2">
                <label>Hình ảnh quảng cáo cho người mua</label>
                {/* NoteAddProduct là một component hiển thị ghi chú hoặc hướng dẫn */}
                <NoteAddProduct content="..." />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {/* Hiển thị ảnh quảng cáo đã chọn */}
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
            {/* Button để mở modal tải ảnh quảng cáo */}
            <Button
                variant="contained"
                onClick={() => setOpenModalSmallImage(true)}
            >
                Tải Lên <Upload fontSize="small" />
            </Button>
            {/* Modal tải ảnh quảng cáo */}
            <UpSmallImage
                onSelectImage={handleSelectImage}
                isOpen={openModalSmallImage}
                onClose={() => setOpenModalSmallImage(false)}
            />
        </div>
    );
};

export default BasicInfoSection;
