import { getStoreOverviewById } from "@/api/store.api";
import { Button } from "@/components/ui/button";
import { useProductDetail } from "@/context/ProductDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const StoreSection = ({}: {}) => {
    const { productDetail } = useProductDetail();
    const navigate = useNavigate();

    const { data: storeData, isLoading: isStoreLoading } = useQuery({
        queryKey: [`store-detail`, productDetail?.storeId],
        queryFn: async () => {
            if (productDetail?.storeId) {
                return await getStoreOverviewById(productDetail.storeId);
            }
            return null;
        },
        enabled: !!productDetail?.storeId,
    });

    // Navigate to store page
    const handleStore = () => {
        if (productDetail?.storeId) {
            navigate({ to: `/store/${productDetail.storeId}` });
        } else {
            console.error("storeId not available");
        }
    };

    return (
        <div className="p-4 flex flex-col md:flex-row items-center justify-between border rounded-2xl shadow-sm bg-white">
            <div className="flex items-center gap-4">
                <img
                    className="w-12 h-12 rounded-full"
                    src={
                        storeData?.logo ||
                        "https://i.pinimg.com/736x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg"
                    }
                    alt="Shop Logo"
                />
                <div>
                    <p className="font-semibold">
                        {storeData?.name || productDetail?.storeId}
                    </p>
                    <p className="text-sm text-gray-500">
                        {isStoreLoading
                            ? "Loading..."
                            : `${storeData?.follower || 0} followers`}
                    </p>
                </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
                <Button onClick={handleStore} variant="outline">
                    Xem cửa hàng
                </Button>
            </div>
        </div>
    );
};

export default StoreSection;
