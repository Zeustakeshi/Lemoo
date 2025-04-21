import { Skus, TypeProductDetail } from "@/common/type/product.type";
import {
    createContext,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

export interface ProductDetailContext {
    productDetail: TypeProductDetail;
    skuImages: string[];
    selectedSku?: Skus;
    setSelectedSku: React.Dispatch<SetStateAction<Skus | undefined>>;
}

const ProductDetailContext = createContext<ProductDetailContext | null>(null);

export function ProductDetailProvider({
    children,
    productDetail,
}: {
    children: React.ReactNode;
    productDetail: TypeProductDetail;
}) {
    const [skuImages, setSkuImages] = useState<string[]>([]);
    const [selectedSku, setSelectedSku] = useState<Skus>();

    useEffect(() => {
        if (!productDetail) return;
        if (productDetail?.skus?.length) {
            const listImage = productDetail.skus.map((item) => item.image);
            setSelectedSku(productDetail.skus[0]);
            setSkuImages(listImage);
        }
    }, [productDetail]);

    return (
        <ProductDetailContext.Provider
            value={{ productDetail, selectedSku, skuImages, setSelectedSku }}
        >
            {children}
        </ProductDetailContext.Provider>
    );
}

export function useProductDetail() {
    const context = useContext(ProductDetailContext);
    if (!context) {
        throw new Error(
            "useProductDetail must be used within a ProductDetailProvider"
        );
    }
    return context;
}
