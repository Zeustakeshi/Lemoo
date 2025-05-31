import ImageCarousel from "./ImageCarousel";
import ProductImage from "./ProductImage";

const ProductImageSection = () => {
    return (
        <section
            className="col-span-1 md:col-span-5 bg-white rounded-2xl shadow-lg"
            aria-label="Product Images"
        >
            <ProductImage />
            {/* Image Carousel for Thumbnails */}
            <ImageCarousel />
        </section>
    );
};

export default ProductImageSection;
