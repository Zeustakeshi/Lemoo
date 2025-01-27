import { SetStateAction } from "react";
import ProductFeature from "../product/ProductFeature";

type Props = {
    setShow: React.Dispatch<SetStateAction<boolean>>;
};

const CartItemRecommendProduct = ({ setShow }: Props) => {
    return (
        <div
            onMouseLeave={() => setShow(false)}
            className="absolute w-full h-max top-0 bg-white shadow-2xl z-10 p-5 rounded-md"
        >
            <ProductFeature></ProductFeature>
        </div>
    );
};

export default CartItemRecommendProduct;
