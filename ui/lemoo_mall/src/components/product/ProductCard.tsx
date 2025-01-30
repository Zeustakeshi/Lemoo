import { cn, formatMoneyVND } from "@/lib/utils";
import { ReactNode, useNavigate } from "@tanstack/react-router";
import Ratting from "../ui/ratting";

type Props = {
    children?: ReactNode;
    className?: string;
    productId: string;
};

const ProductCard = ({ children, productId, className }: Props) => {
    const navigation = useNavigate();

    return (
        <div
            onClick={() =>
                navigation({
                    to: "/products/$productId",
                    params: { productId: productId },
                })
            }
            className={cn(
                "w-[200px] rounded-t-xl  hover:shadow-lg cursor-pointer my-5 transition-all",
                className
            )}
        >
            {children}
        </div>
    );
};

type ProductCardImageProps = {
    url: string;
    className?: string;
};

export const ProductCardImage = ({ url, className }: ProductCardImageProps) => {
    return (
        <div className={cn("w-full aspect-square overflow-hidden", className)}>
            <img
                className="size-full object-cover"
                src={url}
                alt="product-image"
            />
        </div>
    );
};

type ProductCardBodyProps = { children?: ReactNode };

export const ProductCardBody = ({ children }: ProductCardBodyProps) => {
    return <div className="p-4 pt-2 ">{children}</div>;
};

type ProductCardTitleProps = {
    children?: ReactNode;
    className?: string;
};

export const ProductCardTitle = ({
    children,
    className,
}: ProductCardTitleProps) => {
    return (
        <p className={cn("line-clamp-2 text-sm font-semibold ", className)}>
            {children}
        </p>
    );
};

type ProductCardRattingProps = {
    value?: number;
    ratingsCount?: number;
};

export const ProductCardRatting = ({
    value = 0,
    ratingsCount,
}: ProductCardRattingProps) => {
    return (
        <div className="flex justify-start gap-1 items-center">
            <Ratting
                value={value}
                readOnly
                className="my-1"
                size={60}
            ></Ratting>
            {ratingsCount && (
                <span className="text-muted-foreground text-xs">
                    ({ratingsCount})
                </span>
            )}
        </div>
    );
};

type ProductCardPriceProps = {
    originPrice: number;
    promotionPrice?: number;
};

export const ProductCardPrice = ({
    originPrice,
    promotionPrice,
}: ProductCardPriceProps) => {
    return (
        <div className="flex items-center gap-2">
            <p className=" font-semibold text-primary">
                {formatMoneyVND(promotionPrice ? promotionPrice : originPrice)}
            </p>
            {promotionPrice && (
                <p className="text-xs text-muted-foreground line-through">
                    {formatMoneyVND(originPrice)}
                </p>
            )}
        </div>
    );
};

export default ProductCard;
