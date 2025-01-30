import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useRef, useState } from "react";

type Props = {};

const ProductImage = (props: Props) => {
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    zoomX: "0%",
    zoomY: "0%",
  });

  const imageZoomRef = useRef<HTMLDivElement>(null);

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

  const handleMouseOut = () => {
    setZoomStyle({
      display: "none",
      zoomX: "0%",
      zoomY: "0%",
    });
  };
  return (
    <div className="w-full flex flex-col items-center gap-2 p-4 ">
      {/* Hình ảnh chính */}

      <div
        id="imageZoom"
        ref={imageZoomRef}
        style={
          {
            width: "550px",
            height: "700px",
            position: "relative",
            "--url":
              "url(https://i.pinimg.com/736x/d9/a6/61/d9a6614827a5b1ef4135119fb0e04398.jpg)",
            "--zoom-x": zoomStyle.zoomX,
            "--zoom-y": zoomStyle.zoomY,
            "--display": zoomStyle.display,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      >
        <img
          src="https://i.pinimg.com/736x/d9/a6/61/d9a6614827a5b1ef4135119fb0e04398.jpg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "0 0",
          }}
        />
        <div
          style={{
            display: zoomStyle.display,
            content: '""',
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            backgroundImage: `var(--url)`,
            backgroundSize: "200%",
            backgroundPosition: `${zoomStyle.zoomX} ${zoomStyle.zoomY}`,
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      </div>

      {/* Carousel */}
      <Carousel className="p-2 w-full">
        <div className="relative">
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="max-w-max w-max cursor-pointer"
              >
                <div className="w-[50px] p-1 rounded-md border border-primary aspect-square">
                  <img
                    className="size-full object-contain"
                    src="https://picsum.photos/200"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">
                  đỏ - xl
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
};

export default ProductImage;
