import { useFormContext } from "react-hook-form";

type Props = {};

const TaxIdentification = (props: Props) => {
    const form = useFormContext();

    return (
        <input
            multiple={false}
            type="file"
            value={form.getValues("taxDocument")}
            onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (!file) return;
                form.setValue("taxDocument", file);
            }}
        />
    );
};

export default TaxIdentification;
