import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { schema } from "../schema/StoreCreate";

type FormUsers = z.infer<typeof schema>;

interface InputTextProps {
  label: string;
  name: keyof FormUsers;
  register: UseFormRegister<FormUsers>;
  errors: FieldErrors<FormUsers>;
}

const InputText: React.FC<InputTextProps> = ({ label, name, register, errors }) => {
  const isError = !!errors[name]; // Kiểm tra có lỗi không

  return (
    <div>
      <input
        type="text"
        {...register(name)}
        placeholder={label}
        className={`w-96 p-2 border ${
          isError ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {isError && <p className="text-red-500 mt-2">{errors[name]?.message as string}</p>}
    </div>
  );
};

export default InputText;
