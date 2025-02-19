import { MenuItem, Select } from "@mui/material";
import { useFormContext } from "react-hook-form";

type Props = {};

const banks = ["BIDV", "Công thương", "Á châu"];

const BankInformation = (props: Props) => {
    const form = useFormContext();

    return (
        <div className="my-5">
            <h3 className="font-semibold mb-5">Thông tin ngân hàng</h3>

            <Select {...form.register("bankName")}>
                {banks.map((bank, index) => (
                    <MenuItem key={index} value={bank}>
                        {bank}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default BankInformation;
