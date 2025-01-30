import { FormProvider, useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputField from "../InputField/InputFeild";
import DatePickerField from "../DatePicker/DatePickerField";

type FormValues = {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
};

const IndexTest = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data nhận được là: ", data);
  };

  return (
    <FormProvider {...methods}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="firstName" label="First Name" />
          <InputField name="lastName" label="Last Name" />
          <div className="flex items-center space-x-2">
            <DatePickerField name="startDate" label="Start Date" />
            <DatePickerField name="endDate" label="End Date" />
          </div>
          <DatePickerField
            name="date"
            label="Pick a date"
            textFieldProps={{
              sx: {
                fontSize: "15px",
                maxWidth: "20rem",
                "& .MuiInputBase-input": {
                  fontSize: "10px",
                  padding: "10px",
                },
              },
            }}
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </LocalizationProvider>
    </FormProvider>
  );
};

export default IndexTest;
