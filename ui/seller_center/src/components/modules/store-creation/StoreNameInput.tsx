import { Input } from "@mui/material";
import { useFormContext } from "react-hook-form";

type Props = {};

const StoreNameInput = (props: Props) => {
    const form = useFormContext();

    return (
        <div className="px-5">
            <Input
                placeholder="Tên cửa hàng"
                {...form.register("name")}
            ></Input>
        </div>
    );
};

export default StoreNameInput;
