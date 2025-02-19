import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { schema } from "../schema/StoreCreate";


import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TypeBusiness from "./TypeBusiness";
import { useState } from "react";
import Individual from "./Individual";
import Corporate from "./Corporate";
import TaxIdentificationNumber from "./TaxIdentificationNumber";
import Bank from "./Bank";


type FormUsers = z.infer<typeof schema>;

const UserForm = () => {
  const { register, handleSubmit, setValue, formState:{errors} } = useForm<FormUsers>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormUsers> = (data) => {
    console.log("Submitted Data:", {
      ...data,
      // avatar: data.avatar ? data.avatar.name : "No file selected",
    });
  };

  const [selectedTypeBusiness, setSelectedTypeBusiness] =
    useState<string>("Individual");
  const [selectedTypeValidate, setSelectedTypeValidate] =
    useState<string>("CMND");

  return (
    <div className="flex flex-col gap-2">
      <p className="font-sans font-bold text-[22px]">
        Xác minh Thông tin Chủ gian hàng để nhận Thanh Toán!
      </p>
      <div className="flex gap-1 text-green-600">
        <VerifiedUserIcon />
        <p className="font-sans">Thông tin tài khoản của bạn được bảo mật</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TypeBusiness
          selectedType={selectedTypeBusiness}
          setSelectedType={setSelectedTypeBusiness}
        />
        {selectedTypeBusiness === "Individual" ? <Individual 
        selectedType={selectedTypeValidate} 
        setSelectedType={setSelectedTypeValidate} 
        register={register} 
        setValue={setValue} 
        errors={errors}

      />: <Corporate />}
        {/* <CMND register={register} setValue={setValue} /> */}
        <TaxIdentificationNumber register={register} setValue={setValue} errors={errors} />
        <Bank register={register} setValue={setValue} errors={errors} />
        <button type="submit" className="bg-blue-500 p-2 rounded-md w-max ">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
