import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { TextField, TextFieldProps } from "@mui/material";
import dayjs from "dayjs";

type DatePickerFieldProps = {
  name: string;
  label: string;
  // Thêm props TextField vào đây để có thể truyền vào TextField
  textFieldProps?: TextFieldProps;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  textFieldProps, // Nhận các props TextField
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DesktopDateTimePicker
          {...field}
          value={field.value ? dayjs(field.value) : null} // Nếu cần, thay đổi cách chuyển đổi giá trị
          onChange={(date) => field.onChange(date ? date.toISOString() : "")}
          slots={{ textField: TextField }} // Định nghĩa slot với TextField
          slotProps={{
            textField: {
              label: label,
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
              fullWidth: true,
              variant: "outlined",
              ...textFieldProps, // Truyền các props bổ sung từ ngoài vào
            },
          }}
        />
      )}
    />
  );
};

export default DatePickerField;
