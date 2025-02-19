import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface Values {
  nameTitle: string;
  subTitle?: string;
}

const TextTile: React.FC<Values> = ({ nameTitle, subTitle }) => {
  return (
    <div className="flex font-sans gap-1 flex-col">
      <div className="flex items-center gap-1">
        <p className="text-red-600">*</p>
        <p className="font-bold">{nameTitle}</p>
        <HelpOutlineIcon
          className="text-gray-500"
          style={{ fontSize: "18px" }}
        />
      </div>
      <div >
        {subTitle && <p className="text-gray-500 text-sm ml-2">{subTitle}</p>}
      </div>
    </div>
  );
};

export default TextTile;
