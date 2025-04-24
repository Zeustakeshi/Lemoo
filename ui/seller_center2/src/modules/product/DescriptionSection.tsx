import { FormDataAddProduct } from "@/common/type/formAddProduct";
import { Control, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface DescriptionSectionProps {
    control: Control<FormDataAddProduct>;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ control }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
                Mô tả sản phẩm
            </h2>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Mô tả chính
                </label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Nhập mô tả sản phẩm tại đây..."
                            className="h-40"
                        />
                    )}
                />
                <p className="text-sm text-gray-500 mt-12">
                    {control._formValues.description?.length || 0}/5000 ký tự
                </p>
            </div>
        </div>
    );
};

export default DescriptionSection;
