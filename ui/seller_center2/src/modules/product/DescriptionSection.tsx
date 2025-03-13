import { FormDataAddProduct } from "@/common/type/formAddProduct";
import { UseFormRegister } from "react-hook-form";

interface DescriptionSectionProps {
    register: UseFormRegister<FormDataAddProduct>;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
    register,
}) => (
    <div className="border bg-slate-100 rounded-lg min-h-[200px] w-full sm:w-11/12 lg:w-11/12 mx-auto my-2 flex flex-col space-y-5 p-5">
        <div className="m-2">
            <h2 className="font-medium text-xl">Mô tả sản phẩm</h2>
        </div>
        <div>
            <span className="text-gray-400 text-sm">Mô tả chính</span>
            <textarea
                placeholder="Nhập mô tả sản phẩm tại đây..."
                className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md text-sm"
                {...register("description")}
            />
        </div>
    </div>
);

export default DescriptionSection;
