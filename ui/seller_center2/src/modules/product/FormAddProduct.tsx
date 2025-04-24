import { Button } from "@/components/ui/button";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Category } from "../../common/type/category/category.type";
import {
    DataMedia,
    FormDataAddProduct,
    FormVariants,
} from "../../common/type/formAddProduct";
import { api } from "../../lib/api";
import BasicInfoSection from "./BasicInfoSection";
import DescriptionSection from "./DescriptionSection";
import VariantsSection from "./VariantSection";

const FormAddProduct = () => {
    const storeId = JSON.parse(sessionStorage.getItem("storeInfo") || "{}");
    const [selectedCategories, setSelectedCategories] =
        useState<Category | null>(null);
    const [selectedImage, setSelectedImage] = useState<DataMedia | null>(null);
    const [selectedProductImage, setSelectedProductImage] = useState<
        DataMedia[]
    >([]);
    const [complete, setComplete] = useState<boolean>(true);
    const handleComplete = () => setComplete(true);

    const methods = useForm<FormDataAddProduct>({
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
            skus: [],
        },
        mode: "onSubmit", // Kích hoạt validation khi submit
    });

    const { control, handleSubmit, register, setValue, formState } = methods;
    const { errors } = formState;

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
        name: "skus",
    });

    const onSubmit = async (data: FormDataAddProduct) => {
        try {
            // Tạo mảng dữ liệu từ variants
            const VariantsArray = data.variants.map((variants) => ({
                name: variants.name,
                values: variants.values,
            }));

            // Kiểm tra nếu `VariantsArray` chứa dữ liệu hợp lệ
            const isValidVariants = VariantsArray.some(
                (variant) => variant.name && variant.values.length > 0
            );

            if (!isValidVariants) {
                toast.error("Biến thể không được trống, hãy nhập lại.");
                setComplete(true);
                return;
            }

            const result = VariantsArray.reduce<FormVariants[]>((acc, curr) => {
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

            if (VariantsArray.length !== 0) {
                data.categoryId = selectedCategories?.id || "";
                data.smallImage.mediaId = selectedImage?.mediaId || "";
                data.smallImage.url = selectedImage?.url || "";
                data.images = selectedProductImage;
                data.variants = result;

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
                return response.data;
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(`tạo sản phẩm thất bại ${JSON.stringify(error)}`);
            throw error;
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
            {/* Sticky Header */}
            <header className="sticky top-0 z-10 bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Thêm Sản Phẩm
                </h1>
                <div className="flex space-x-2">
                    <Button onClick={handleSubmit(onSubmit)}>
                        Tạo Sản Phẩm
                    </Button>
                </div>
            </header>

            {/* Progress Stepper */}
            <div className="my-6">
                <Stepper activeStep={0} alternativeLabel>
                    <Step>
                        <StepLabel>Thông tin cơ bản</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Biến thể</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Mô tả sản phẩm</StepLabel>
                    </Step>
                </Stepper>
            </div>

            {/* Form Content */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        register={register}
                        variantsFields={variantsFields}
                        appendVariants={appendVariants}
                        removeVariants={removeVariants}
                        skuFields={SkuFields}
                        appendSku={appendSku}
                        removeSku={removeSku}
                        setValue={setValue}
                        control={control}
                    />
                    <DescriptionSection control={control} />
                </form>
            </FormProvider>
        </div>
    );
};

export default FormAddProduct;
