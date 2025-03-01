import { StoreOverviewResponse } from "@/common/type/store.type";
import StoreInfoCard from "./StoreInfoCard";

type Props = {
    store: StoreOverviewResponse;
};

const StoreHeader = ({ store }: Props) => {
    return (
        <div className="relative h-[120px] p-3 bg-[url('https://media.istockphoto.com/id/2182443840/photo/numbers-2025-made-of-pasta-and-tomato-on-a-dark-stone-background-a-culinary-idea-for-the-new.webp?a=1&b=1&s=612x612&w=0&k=20&c=YHvO9DxPVYzDkVfq3Ia88mCHiZVhqwm8UlHKlqPlQSg=')]">
            <div className="abs-center z-0 w-full h-full bg-slate-900/60"></div>
            <StoreInfoCard store={store}></StoreInfoCard>
        </div>
    );
};

export default StoreHeader;
