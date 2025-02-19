import React from "react";
import TextTile from "./TextTile";
import CustomGroupRadio from "./CustomGroupRadio";
import CMND  from "./CMND";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import HoChieu from "./HoChieu";

interface TypeBusinessProp {
  setSelectedType: (value: string) => void;
  selectedType: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}


const Individual: React.FC<TypeBusinessProp> = ({
  selectedType,
  setSelectedType,
  register,
  setValue,
  errors
}) => {
  const option = [
    { label: "Chứng minh nhân dân", value: "CMND" },
    { label: "Hộ chiếu", value: "hc" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl">
      <p className="font-sans text-[20px] font-bold">Xác nhận thông tin cá nhân</p>
      
      <TextTile nameTitle="Loại giấy tờ" />
      <CustomGroupRadio
        options={option}
        selectedValue={selectedType}
        setSelectedValue={setSelectedType}
      />
      {/* Sử dụng component PersonalDetails */}
      {selectedType === 'CMND' ? <CMND register={register} setValue={setValue} errors={errors} /> : <HoChieu/> }
     

    </div>
  );
};

export default Individual;
