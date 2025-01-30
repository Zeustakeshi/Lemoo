import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type InputFieldProps = {
  name: string;
  label: string;
} & TextFieldProps;

const InputField: React.FC<InputFieldProps> = ({ name, label, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default InputField;
