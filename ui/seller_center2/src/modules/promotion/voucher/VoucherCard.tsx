import { useRouter } from "@tanstack/react-router";
type Props = {
    to: string;
    name: string;
    description?: string;

    iconUrl: string;
};
const VoucherCard = ({ to, name, description, iconUrl }: Props) => {
    const router = useRouter();

    return (
        <div
            onClick={() => {
                router.navigate({ to: to });
            }}
            className="p-5 hover:shadow-xl cursor-pointer transition-all grid grid-cols-8 shadow-md items-center gap-2  border border-blue-500 rounded-xl overflow-hidden"
        >
            <div className="col-span-2 flex justify-center items-center">
                <img src={iconUrl} alt="" />
            </div>

            <div className="col-span-5 p-2">
                <div className=" font-semibold text-xl">{name}</div>
                {description && (
                    <div className="text-sm text-left mt-2 text-slate-600">
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoucherCard;
