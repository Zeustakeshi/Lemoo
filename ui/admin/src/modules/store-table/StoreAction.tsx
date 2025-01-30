import { StoreType } from "@/common/type/store.type";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Check, Eye, Trash2, X } from "lucide-react";

type Props = { store: StoreType };

const StoreAction = ({ store }: Props) => {
    return (
        <TableCell className="flex justify-end gap-2">
            <Button variant="default" size="icon">
                <Eye />
            </Button>
            {store.status === "PENDING" && (
                <>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="!bg-green-600 text-white "
                    >
                        <Check />
                    </Button>
                    <Button variant="destructive" size="icon">
                        <X />
                    </Button>
                </>
            )}

            {store.status !== "PENDING" && store.status !== "DELETED" && (
                <>
                    <Button variant="destructive" size="icon">
                        <Trash2 />
                    </Button>
                </>
            )}
        </TableCell>
    );
};

export default StoreAction;
