import { Add, ErrorOutlineOutlined } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import {
    Control,
    Controller,
    UseFieldArrayReturn,
    UseFormRegister,
} from "react-hook-form";
import { FormDataAddProduct } from "../../common/type/formAddProduct";
import UpImageProducts from "./media/UpImageProducts";

interface VariantsSectionProps {
    control: Control<FormDataAddProduct>;
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
    const storeId = JSON.parse(sessionStorage.getItem("storeInfo") || "{}") as {
        id: string;
    };

    const [openModalSkuImage, setOpenModalSkuImage] = useState<{
        [key: number]: boolean;
    }>({});

    const handleOpenModalSkuImage = (index: number) => {
        setOpenModalSkuImage((prev) => ({ ...prev, [index]: true }));
    };

    const handleCloseModalSkuImage = (index: number) => {
        setOpenModalSkuImage((prev) => ({ ...prev, [index]: false }));
    };

    return (
        <div className="border bg-slate-100 rounded-lg min-h-[200px] w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
            <div className="m-2">
                <h2 className="font-medium text-xl">
                    Giá bán, Kho hàng và Biến thể
                </h2>
                <span className="text-gray-400 text-sm">
                    Tạo biến thể nếu sản phẩm có hơn một tùy chọn...
                </span>
            </div>
            <div className="m-1 flex items-center space-x-2">
                <label>Biến thể</label>
                <div className="relative group">
                    <ErrorOutlineOutlined
                        sx={{ color: "gray", fontSize: "20px" }}
                    />
                    <div className="absolute left-0 bottom-full mt-2 w-64 p-4 bg-gray-100 text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <button
                    className="border px-6 py-2 rounded-lg flex justify-center items-center hover:border-black"
                    type="button"
                    onClick={() => appendVariants({ name: "", values: [] })}
                >
                    <Add fontSize="small" />
                    <span>Thêm biến thể</span>
                </button>
                {variantsFields.map((field, index) => (
                    <div className="flex space-x-4" key={field.id}>
                        <input
                            type="text"
                            placeholder="Tên biến thể"
                            {...register(`variants.${index}.name`)}
                        />
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
            <Divider />
            <div className="flex flex-col space-y-4">
                <div className="m-1 flex items-center space-x-2">
                    <label>Các Biến Thể Của Sản Phẩm</label>
                </div>
                {skuFields.map((field, index) => (
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
                                {...register(`skus.${index}.name`)}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
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
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hình ảnh
                            </label>
                            <Controller
                                name={`skus.${index}.image`}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                handleOpenModalSkuImage(index)
                                            }
                                        >
                                            Tải Lên
                                        </Button>
                                        <UpImageProducts
                                            onSelectProductImage={(
                                                selectedImages
                                            ) => {
                                                const image = selectedImages[0];
                                                if (image) {
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
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Giá (VNĐ)
                            </label>
                            <input
                                type="number"
                                {...register(`skus.${index}.price`, {
                                    valueAsNumber: true,
                                })}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Số lượng tồn kho
                            </label>
                            <input
                                type="number"
                                {...register(`skus.${index}.stock`, {
                                    valueAsNumber: true,
                                })}
                                className="w-full rounded-md border-gray-300 p-2"
                            />
                        </div>
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
