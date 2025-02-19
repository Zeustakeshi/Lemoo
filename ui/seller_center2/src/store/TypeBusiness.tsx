import * as React from "react";
import TextTile from "./TextTile";
import CustomGroupRadio from "./CustomGroupRadio";

interface TypeBusinessProp {
  setSelectedType: (value: string) => void;
  selectedType: string;
}

const TypeBusiness: React.FC<TypeBusinessProp> = ({ selectedType, setSelectedType }) => {
  const options = [
    { label: "Individual - Vietnam Citizen ID (passport if foreigner) needed", value: "Individual" },
    { label: "Corporate - Enterprise Business Registration Certificate needed", value: "Corporate" },
  ];

  return (
    <div className="bg-white rounded-xl p-4">
      <TextTile nameTitle="Chọn loại" />
      <CustomGroupRadio options={options} selectedValue={selectedType} setSelectedValue={setSelectedType} />
    </div>
  );
};

export default TypeBusiness;
