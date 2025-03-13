import { Add, ErrorOutlineOutlined } from "@mui/icons-material";
import { Button, Divider } from "@mui/material"; // Import Button and Divider from Material-UI
import { useState } from "react"; // Import useState for managing modal state
import {
    Control,
    Controller,
    UseFieldArrayReturn,
    UseFormRegister,
} from "react-hook-form"; // Import React Hook Form types and utilities
import { FormDataAddProduct } from "../../common/type/formAddProduct"; // Import the form data type
import UpImageProducts from "./media/UpImageProducts"; // Import the image upload component

// Define the props for the VariantsSection component
interface VariantsSectionProps {
    control: Control<FormDataAddProduct>; // Control object from React Hook Form
    register: UseFormRegister<FormDataAddProduct>; // Register function from React Hook Form
    variantsFields: UseFieldArrayReturn<
        FormDataAddProduct,
        "variants"
    >["fields"]; // Fields array for variants
    appendVariants: UseFieldArrayReturn<
        FormDataAddProduct,
        "variants"
    >["append"]; // Append function for variants
    removeVariants: UseFieldArrayReturn<
        FormDataAddProduct,
        "variants"
    >["remove"]; // Remove function for variants
    skuFields: UseFieldArrayReturn<FormDataAddProduct, "skus">["fields"]; // Fields array for SKUs
    appendSku: UseFieldArrayReturn<FormDataAddProduct, "skus">["append"]; // Append function for SKUs
    removeSku: UseFieldArrayReturn<FormDataAddProduct, "skus">["remove"]; // Remove function for SKUs
}

// VariantsSection component
const VariantsSection = ({
    control,
    register,
    variantsFields,
    appendVariants,
    removeVariants,
    skuFields,
    appendSku,
    removeSku,
}: VariantsSectionProps) => {
    // Retrieve store ID from session storage
    const storeId = JSON.parse(sessionStorage.getItem("storeInfo") || "{}") as {
        id: string;
    };

    // State to manage the open/close state of the modal for each SKU image
    const [openModalSkuImage, setOpenModalSkuImage] = useState<{
        [key: number]: boolean;
    }>({});

    // Function to open the modal for a specific SKU image
    const handleOpenModalSkuImage = (index: number) => {
        setOpenModalSkuImage((prev) => ({ ...prev, [index]: true }));
    };

    // Function to close the modal for a specific SKU image
    const handleCloseModalSkuImage = (index: number) => {
        setOpenModalSkuImage((prev) => ({ ...prev, [index]: false }));
    };

    return (
        // Container for the entire variant section
        <div className="border bg-slate-100 rounded-lg min-h-[200px] w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
            {/* Section header */}
            <div className="m-2">
                <h2 className="font-medium text-xl">
                    Giá bán, Kho hàng và Biến thể
                </h2>
                <span className="text-gray-400 text-sm">
                    Tạo biến thể nếu sản phẩm có hơn một tùy chọn...
                </span>
            </div>
            {/* Variant label with tooltip */}
            <div className="m-1 flex items-center space-x-2">
                <label>Biến thể</label>
                <div className="relative group">
                    <ErrorOutlineOutlined
                        sx={{ color: "gray", fontSize: "20px" }}
                    />
                    {/* Tooltip content (hidden by default, shown on hover) */}
                    <div className="absolute left-0 bottom-full mt-2 w-64 p-4 bg-gray-100 text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                </div>
            </div>
            {/* Variant input fields */}
            <div className="flex flex-col space-y-4">
                {/* Button to add a new variant */}
                <button
                    className="border px-6 py-2 rounded-lg flex justify-center items-center hover:border-black"
                    type="button"
                    onClick={() => appendVariants({ name: "", values: [] })}
                >
                    <Add fontSize="small" />
                    <span>Thêm biến thể</span>
                </button>
                {/* Map through the variants fields and render input fields for each */}
                {variantsFields.map((field, index) => (
                    <div className="flex space-x-4" key={field.id}>
                        {/* Input for variant name */}
                        <input
                            type="text"
                            placeholder="Tên biến thể"
                            {...register(`variants.${index}.name`)}
                        />
                        {/* Input for variant values (comma-separated) */}
                        <input
                            type="text"
                            placeholder="Giá trị biến thể (cách nhau bằng dấu phẩy)"
                            {...register(`variants.${index}.values`, {
                                setValueAs: (value: string) =>
                                    typeof value === "string"
                                        ? value
                                              .split(",")
                                              .map((v: string) => v.trim())
                                        : [],
                            })}
                        />
                        {/* Button to remove a variant */}
                        <button
                            className="border px-4 p-1 rounded-lg text-slate-100 bg-red-400"
                            type="button"
                            onClick={() => removeVariants(index)}
                        >
                            Xóa
                        </button>
                    </div>
                ))}
            </div>
            {/* Divider line */}
            <Divider />
            {/* SKU (Stock Keeping Unit) section */}
            <div className="flex flex-col space-y-4">
                {/* SKU section label */}
                <div className="m-1 flex items-center space-x-2">
                    <label>Các Biến Thể Của Sản Phẩm</label>
                </div>
                {/* Map through the SKU fields and render input fields for each */}
                {skuFields.map((field, index) => (
                    <div
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                        key={field.id}
                    >
                        {/* Variant Name Input */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên biến thể
                            </label>
                            <input
                                type="text"
                                {...register(`skus.${index}.name`)}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
                        {/* SKU Input */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SKU
                            </label>
                            <input
                                type="text"
                                {...register(`skus.${index}.sellerSku`)}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
                        {/* Image Upload */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hình ảnh
                            </label>
                            <Controller
                                name={`skus.${index}.image`}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        {/* Button to open the image upload modal */}
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                handleOpenModalSkuImage(index)
                                            }
                                        >
                                            Tải Lên
                                        </Button>
                                        {/* Image upload component */}
                                        <UpImageProducts
                                            onSelectProductImage={(
                                                selectedImages
                                            ) => {
                                                const image = selectedImages[0]; // Get the first image
                                                if (image) {
                                                    // Update the field value with the selected image
                                                    field.onChange({
                                                        mediaId: image.mediaId,
                                                        url: image.url,
                                                    });
                                                }
                                            }}
                                            isOpen={
                                                openModalSkuImage[index] ||
                                                false
                                            }
                                            onClose={() =>
                                                handleCloseModalSkuImage(index)
                                            }
                                        />
                                        {/* Display the selected image */}
                                        {field.value && (
                                            <div className="mt-2">
                                                <img
                                                    src={
                                                        field.value.url ||
                                                        "https://placehold.co/400x400?text=Ảnh\nsản\nphẩm"
                                                    }
                                                    alt="SKU Preview"
                                                    className="w-24 h-24 object-cover rounded-lg border"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        {/* Package Width Input */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chiều rộng gói (cm)
                            </label>
                            <input
                                type="number"
                                {...register(`skus.${index}.packageWidth`, {
                                    valueAsNumber: true,
                                })}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
                        {/* Package Height Input */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chiều cao gói (cm)
                            </label>
                            <input
                                type="number"
                                {...register(`skus.${index}.packageHeight`, {
                                    valueAsNumber: true,
                                })}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
                        {/* Package Length Input */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chiều dài gói (cm)
                            </label>
                            <input
                                type="number"
                                {...register(`skus.${index}.packageLength`, {
                                    valueAsNumber: true,
                                })}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
                        {/* Package Weight Input */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trọng lượng gói (kg)
                            </label>
                            <input
                                type="number"
                                {...register(`skus.${index}.packageWeight`, {
                                    valueAsNumber: true,
                                })}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
                        {/* Remove Button */}
                        <div className="col-span-full md:col-span-1 flex justify-end">
                            <button
                                type="button"
                                onClick={() => removeSku(index)}
                                className="rounded-md bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VariantsSection;
