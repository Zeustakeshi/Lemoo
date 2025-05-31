import { getProductDetail } from "@/api/product.api";
import { ProductDetailProvider } from "@/context/ProductDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import ProductDetailsSection from "./ProductDetailSection";
import ProductImageSection from "./ProductImageSection";
import StoreSection from "./StoreSection";

const ProductDetail = () => {
    const { productId }: { productId: string } = useParams({ strict: false });

    // Query to fetch product details
    const { data: productData } = useQuery({
        queryKey: [`product-detail`, productId],
        queryFn: async () => await getProductDetail(productId),
    });

    if (!productData) return <p>Đang tải sản phẩm</p>;

    return (
        <ProductDetailProvider productDetail={productData}>
            <div className="w-full p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Product Image Section */}
                    <ProductImageSection />

                    {/* Product Details Section */}
                    <ProductDetailsSection />

                    {/* Additional Information Section */}
                    <section
                        className="col-span-1 md:col-span-12 mt-8 space-y-6"
                        aria-label="Additional Information"
                    >
                        {/* Shop Section */}
                        <StoreSection />
                    </section>
                    <div
                        className="col-span-12"
                        dangerouslySetInnerHTML={{
                            __html: productData.description,
                        }}
                    />
                </div>
            </div>
        </ProductDetailProvider>
    );
};

export default ProductDetail;
