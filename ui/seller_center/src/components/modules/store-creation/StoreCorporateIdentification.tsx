import { useFormContext } from "react-hook-form";

type Props = {};

const StoreCorporateIdentification = (props: Props) => {
    const form = useFormContext();

    return (
        <div className="py-5 px-4 flex justify-start gap-5 items-center">
            <label className="space-x-3">
                <input
                    type="radio"
                    value="COMPANY"
                    {...form.register("businessType")}
                />
                Company
            </label>
            <label className="space-x-3">
                <input
                    type="radio"
                    value="HOUSEHOLD"
                    {...form.register("businessType")}
                />
                Business Household
            </label>
        </div>
    );
};

export default StoreCorporateIdentification;
