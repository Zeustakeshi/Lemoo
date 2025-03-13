import { useFieldArray, useForm } from "react-hook-form";

import { useState } from "react";

import { Category } from "../../common/type/category/category.type";
import {
    DataMedia,
    FormDataAddProduct,
    FormVariants,
    SkusVar,
} from "../../common/type/formAddProduct";

import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { api } from "../../lib/api";
import BasicInfoSection from "./BasicInfoSection";
import DescriptionSection from "./DescriptionSection";
import VariantsSection from "./VariantSection";

const FormAddProduct = () => {
    const storeId = JSON.parse(sessionStorage.getItem("storeInfo") || "{}");
    console.log("id cửa hàng: ", storeId);
    const [selectedCategories, setSelectedCategories] =
        useState<Category | null>(null);
    const [selectedImage, setSelectedImage] = useState<DataMedia | null>(null);
    const [selectedProductImage, setSelectedProductImage] = useState<
        DataMedia[]
    >([]);
    const [complete, setComplete] = useState<boolean>(true);
    const [isSave, setIsSave] = useState<boolean>(false);
    const handleComplete = () => setComplete(true);
    const handleSave = () => {
        setComplete(false);
        setIsSave(true);
    };

    const { control, handleSubmit, register } = useForm<FormDataAddProduct>({
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            smallImage: {
                mediaId: "",
                url: "",
            },
            video: {
                mediaId: "",
                url: "",
            },
            images: [
                {
                    mediaId: "",
                    url: "",
                },
            ],
            variants: [{ name: "", values: [""] }],
        },
    });

    const router = useRouter();

    const {
        fields: variantsFields,
        append: appendVariants,
        remove: removeVariants,
    } = useFieldArray({
        control,
        name: "variants",
    });

    const {
        fields: SkuFields,
        append: appendSku,
        remove: removeSku,
    } = useFieldArray({
        control,
        name: "skus", // Tên mảng variants
    });

    const onSubmit = async (data: FormDataAddProduct) => {
        try {
            // tạo một mảng dữ liệu từ attribute ở trên
            const VariantsArray = data.variants.map((variants) => ({
                name: variants.name,
                values: variants.values,
            }));
            // Kiểm tra nếu `VariantsArray` chứa dữ liệu hợp lệ
            const isValidVariants = VariantsArray.some(
                (variant) => variant.name && variant.values.length > 0
            );

            if (!isValidVariants) {
                alert("Biến thể không được trống, hãy nhập lại.");
                setComplete(true);
                setIsSave(false);
                return; // Kết thúc hàm nếu mảng không hợp lệ
            }
            const result = VariantsArray.reduce<FormVariants[]>((acc, curr) => {
                // Nếu curr.values là chuỗi, chuyển nó thành mảng
                const values =
                    typeof curr.values === "string"
                        ? [curr.values]
                        : curr.values;

                const existing = acc.find((item) => item.name === curr.name);
                if (existing) {
                    existing.values.push(...values);
                } else {
                    acc.push({ name: curr.name, values: [...values] });
                }
                return acc;
            }, []);
            //Covert key-value
            if (complete == false) {
                const baseSku = {
                    name: "",
                    image: {} as DataMedia,
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

                // Tạo variant từ attribute
                function generateVariants(result: FormVariants[]) {
                    const SkusResult: SkusVar[] = [];

                    function backtrack(
                        currentIndex: number,
                        currentVariants: Record<string, string>
                    ) {
                        if (currentIndex === result.length) {
                            const newVariant: SkusVar = {
                                ...baseSku,
                                variants: { ...currentVariants },
                                name: Object.values(currentVariants).join(
                                    " - "
                                ), // Tạo tên từ giá trị attributes
                            };
                            SkusResult.push(newVariant);
                            return;
                        }

                        const { name, values } = result[currentIndex];
                        for (const value of values) {
                            currentVariants[name] = value; // Thêm thuộc tính vào variant
                            backtrack(currentIndex + 1, currentVariants);
                            delete currentVariants[name]; // Xóa thuộc tính khi quay lui
                        }
                    }

                    backtrack(0, {});
                    return SkusResult;
                }

                // Bước cuối cùng: Tạo các biến thể từ các thuộc tính
                const generatedVariants = generateVariants(result);
                generatedVariants.forEach((item) => {
                    appendSku({
                        name: item.name,
                        sellerSku: item.sellerSku,
                        allowSale: item.allowSale,
                        price: item.price,
                        stock: item.stock,
                        packageHeight: item.packageHeight,
                        packageLength: item.packageLength,
                        packageWeight: item.packageWeight,
                        packageWidth: item.packageWidth,
                        variants: item.variants,
                        image: {
                            mediaId: "",
                            url: "",
                        },
                    });
                });
            }

            if (complete && VariantsArray.length != 1) {
                data.categoryId = selectedCategories?.id || "";
                data.smallImage.mediaId = selectedImage?.mediaId || "";
                data.smallImage.url = selectedImage?.url || "";
                data.images = selectedProductImage;
                data.variants = result;
                //Gửi yêu cầu API
                const response = await api.post(
                    "/products/store",
                    JSON.stringify(data),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-store-Id": storeId.id,
                        },
                    }
                );

                toast.success("Tạo sản phẩm thành công");

                router.navigate({ to: "/" });
                // Xử lý phản hồi thành công
                return response.data;
            }
        } catch (error) {
            // Xử lý lỗi
            console.error("Error adding product:", error);
            toast.error("Tạo sản phẩm thất bại");
            throw error;
        }
    };

    return (
        <form
            className="flex flex-col space-y-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="m-2 text-2xl font-semibold">
                <h1>Thêm Sản Phẩm</h1>
            </div>

            <BasicInfoSection
                register={register}
                control={control}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                selectedProductImages={selectedProductImage}
                setSelectedProductImages={setSelectedProductImage}
            />

            <VariantsSection
                control={control}
                register={register}
                variantsFields={variantsFields}
                appendVariants={appendVariants}
                removeVariants={removeVariants}
                skuFields={SkuFields}
                appendSku={appendSku}
                removeSku={removeSku}
            />

            <DescriptionSection register={register} />

            {complete && !isSave ? (
                <div className="flex items-center justify-center">
                    <button
                        className=" rounded-md bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500"
                        type="submit"
                        onClick={handleSave}
                    >
                        Lưu
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <button
                        className=" rounded-md bg-green-500 text-white px-4 py-2 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                        type="submit"
                        onClick={handleComplete}
                    >
                        Tạo Sản Phẩm
                    </button>
                </div>
            )}
            {/* <button onClick={getStore}>lấy sản phẩm</button> */}
        </form>
    );
};

export default FormAddProduct;
