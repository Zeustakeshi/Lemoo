import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type Props = {};

const CartHeader = ({}: Props) => {
    return (
        <Button
            size="icon"
            variant="ghost"
            className="  [&_svg]:size-6 [&_svg]:shrink-0 dark:[&_svg]:text-white "
        >
            <ShoppingBag />
        </Button>
    );
};

export default CartHeader;
