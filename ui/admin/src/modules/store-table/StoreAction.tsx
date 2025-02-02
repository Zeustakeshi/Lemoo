import { activateStore, deactivateStore } from "@/api/store.api";
import { StoreType } from "@/common/type/store.type";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { useMutation } from "@tanstack/react-query";
import { Check, Eye, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

type Props = { store: StoreType };

const StoreAction = ({ store }: Props) => {
    const {
        mutateAsync: activateStoreMutation,
        isPending: activateStorePending,
    } = useMutation({
        mutationKey: ["activate store", store.storeId],
        mutationFn: async () => await activateStore(store.storeId),
    });

    const {
        mutateAsync: deactivateStoreMutation,
        isPending: deactivateStorePending,
    } = useMutation({
        mutationKey: ["deactivate store", store.storeId],
        mutationFn: async () => await deactivateStore(store.storeId),
    });

    const handleActivateStore = async () => {
        try {
            await activateStoreMutation();
            toast.success("Kích hoạt cửa hàng thành công");
        } catch (error: any) {
            console.log({ error });
            toast.error("Kích hoạt cửa hàng thất bại");
        }
    };

    const handleDeactivateStore = async () => {
        try {
            await deactivateStoreMutation();
            toast.success("Hủy kích hoạt cửa hàng thành công");
        } catch (error: any) {
            console.log({ error });
            toast.error("Hủy kích hoạt cửa hàng thất bại");
        }
    };

    return (
        <TableCell className="flex justify-end gap-2">
            <Button variant="default" size="icon">
                <Eye />
            </Button>
            {store.status === "PENDING" && (
                <>
                    <Button
                        disabled={
                            activateStorePending || deactivateStorePending
                        }
                        onClick={handleActivateStore}
                        variant="secondary"
                        size="icon"
                        className="!bg-green-600 text-white "
                    >
                        <Check />
                    </Button>
                    <Button
                        disabled={
                            activateStorePending || deactivateStorePending
                        }
                        onClick={handleDeactivateStore}
                        variant="destructive"
                        size="icon"
                    >
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
