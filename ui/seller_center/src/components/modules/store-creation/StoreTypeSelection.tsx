import { StoreType } from "../../../common/enums/Store.enum";

type Props = {
    storeType: StoreType;
    setStoreType: React.Dispatch<React.SetStateAction<StoreType>>;
};

const StoreTypeSelection = ({ setStoreType, storeType }: Props) => {
    return (
        <div className="w-full p-5 bg-white rounded-xl">
            {/* Tùy chọn 1 */}
            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                <input
                    type="radio"
                    value={0}
                    checked={storeType === StoreType.Individual}
                    onChange={() => setStoreType(StoreType.Individual)}
                    className=" h-5 w-5 accent-blue-500 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                    Individual - Vietnam Citizen ID (passport if foreigner)
                    needed
                </span>
            </label>

            {/* Tùy chọn 2 */}
            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                <input
                    type="radio"
                    value={2}
                    checked={storeType === StoreType.Corporate}
                    onChange={() => setStoreType(StoreType.Corporate)}
                    className=" h-5 w-5 accent-blue-500 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700">
                    Corporate - Enterprise Business Registration Certificate
                    needed
                </span>
            </label>
        </div>
    );
};

export default StoreTypeSelection;
