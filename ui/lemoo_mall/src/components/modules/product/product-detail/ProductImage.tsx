import { useProductDetail } from "@/context/ProductDetailContext";
import { useRef, useState } from "react";

// Interface for component props
interface ProductImageProps {}

// Interface for zoom style state
interface ZoomStyle {
    display: string;
    zoomX: string;
    zoomY: string;
}

// Component for rendering the main image with zoom functionality
const MainImage = ({
    selectedImage,
    zoomStyle,
    handleMouseMove,
    handleMouseOut,
    imageZoomRef,
}: {
    selectedImage: string;
    zoomStyle: ZoomStyle;
    handleMouseMove: (event: React.MouseEvent) => void;
    handleMouseOut: () => void;
    imageZoomRef: React.RefObject<HTMLDivElement>;
}) => (
    <div
        id="imageZoom"
        ref={imageZoomRef}
        style={
            {
                position: "relative",
                "--url": `url(${selectedImage})`,
                "--zoom-x": zoomStyle.zoomX,
                "--zoom-y": zoomStyle.zoomY,
                "--display": zoomStyle.display,
            } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        onBlur={handleMouseOut}
        className="rounded-lg overflow-hidden"
    >
        {/* Main Image */}
        <img
            src={selectedImage}
            alt="Main product image"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "0 0",
            }}
        />
        {/* Zoom Overlay */}
        <div
            style={{
                display: zoomStyle.display,
                content: '""',
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                backgroundImage: `var(--url)`,
                backgroundSize: "300%",
                backgroundPosition: `${zoomStyle.zoomX} ${zoomStyle.zoomY}`,
                position: "absolute",
                left: 0,
                top: 0,
            }}
        />
    </div>
);

// Main ProductImage component
const ProductImage = ({}: ProductImageProps) => {
    const { selectedSku } = useProductDetail();

    // State for zoom effect
    const [zoomStyle, setZoomStyle] = useState<ZoomStyle>({
        display: "none",
        zoomX: "0%",
        zoomY: "0%",
    });

    // Ref for the main image container
    const imageZoomRef = useRef<HTMLDivElement>(null);

    // Handle mouse movement for zoom effect
    const handleMouseMove = (event: React.MouseEvent) => {
        if (imageZoomRef.current) {
            const { offsetWidth, offsetHeight } = imageZoomRef.current;
            const x = (event.nativeEvent.offsetX * 100) / offsetWidth;
            const y = (event.nativeEvent.offsetY * 100) / offsetHeight;

            setZoomStyle({
                display: "block",
                zoomX: `${x}%`,
                zoomY: `${y}%`,
            });
        }
    };

    // Reset zoom effect when mouse leaves
    const handleMouseOut = () => {
        setZoomStyle({
            display: "none",
            zoomX: "0%",
            zoomY: "0%",
        });
    };

    return (
        <div className="w-full flex flex-col items-center gap-2 p-4">
            {/* Main Image with Zoom */}
            <MainImage
                selectedImage={
                    selectedSku?.image || "https://placehold.co/600x400"
                }
                zoomStyle={zoomStyle}
                handleMouseMove={handleMouseMove}
                handleMouseOut={handleMouseOut}
                imageZoomRef={imageZoomRef}
            />
        </div>
    );
};

export default ProductImage;
